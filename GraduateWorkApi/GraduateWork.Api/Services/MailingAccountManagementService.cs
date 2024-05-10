using AutoMapper;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Responses;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.Extensions.Options;

namespace GraduateWorkApi.Services;

internal class MailingAccountManagementService : IMailingAccountManagementService
{
    private readonly IUserDependentRepository<MailingAccount> _mailingAccountsRepository;
    private readonly IMapper _mapper;
    private readonly GoogleAuthConfig _googleAuthConfig;

    public MailingAccountManagementService(
        IUserDependentRepository<MailingAccount> mailingAccountsRepository,
        IMapper mapper,
        IOptions<GoogleAuthConfig> googleAuthConfig)
    {
        _mailingAccountsRepository = mailingAccountsRepository;
        _mapper = mapper;
        _googleAuthConfig = googleAuthConfig.Value;
    }
    
    public async Task StoreAsync<T>(string key, T token)
    {
        var tokenResponse = ValidateTokenType(token);
        var payload = await ValidateAccess(tokenResponse);
        var mailingAccount = (await _mailingAccountsRepository.Get(ma => ma.Email == payload.Email)).SingleOrDefault();
        var mailingAccountId = ValidateKey(key, false);
        if (mailingAccount != null &&
            mailingAccountId != null &&
            mailingAccount.Id != mailingAccountId)
        {
            throw new Exception("Mailing account with provided email and different Id already exists.");
        }

        mailingAccount ??= new MailingAccount();
        _mapper.Map(payload, mailingAccount);
        _mapper.Map(tokenResponse, mailingAccount);

        await _mailingAccountsRepository.CreateOrUpdate(mailingAccount);
    }

    public Task DeleteAsync<T>(string key)
    {
        ValidateTokenType<T>();
        var mailingAccountId = ValidateKey(key).Value;
        return _mailingAccountsRepository.Delete(mailingAccountId);
    }

    public async Task<T> GetAsync<T>(string key)
    {
        ValidateTokenType<T>();
        var mailingAccountId = ValidateKey(key).Value;
        var mailingAccount = (await _mailingAccountsRepository.Get(ma => ma.Id == mailingAccountId)).SingleOrDefault();
        if (mailingAccount == null)
        {
            throw new Exception("There's no mailing account with provided Id.");
        }

        return _mapper.Map<T>(mailingAccount);
    }

    public Task ClearAsync()
    {
        throw new NotImplementedException();
    }

    private static TokenResponse ValidateTokenType<T>(T token)
    {
        if (token is not TokenResponse response)
        {
            throw new Exception($"Token should be an instance of {nameof(TokenResponse)}");
        }

        return response;
    }
    
    private static void ValidateTokenType<T>()
    {
        if (typeof(T) != typeof(TokenResponse))
        {
            throw new Exception($"Token should be an instance of {nameof(TokenResponse)}");
        }
    }
    
    private static Guid? ValidateKey(string key, bool mandatory = true)
    {
        if (!mandatory && string.IsNullOrEmpty(key))
        {
            return null;
        }
        
        if (!Guid.TryParse(key, out var id))
        {
            throw new Exception("Key should be convertable to GUID.");
        }

        return id;
    }
    
    private async Task<GoogleJsonWebSignature.Payload> ValidateAccess(TokenResponse tokenResponse)
    {
        return await GoogleJsonWebSignature.ValidateAsync(tokenResponse.IdToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _googleAuthConfig.ClientId }
        });
    }
}