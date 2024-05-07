using System.Security.Claims;
using AutoMapper;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Gmail.v1;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.Extensions.Options;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class MailingAccountManagementService : IMailingAccountManagementService
{
    private readonly GoogleAuthConfig _googleAuthConfig;
    private readonly IUserDependentEntityManager<MailingAccount> _mailingAccountsManager;
    private readonly IMapper _mapper;

    public MailingAccountManagementService(
        IOptions<GoogleAuthConfig> googleAuthConfig,
        IUserDependentEntityManager<MailingAccount> mailingAccountsManager,
        IMapper mapper)
    {
        _googleAuthConfig = googleAuthConfig.Value;
        _mailingAccountsManager = mailingAccountsManager;
        _mapper = mapper;
    }

    public async Task<Result<MailingAccount, string>> Create(string token, ClaimsPrincipal user)
    {
        var cancellationToken = new CancellationToken();
        var cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        cancellationTokenSource.CancelAfter(TimeSpan.FromSeconds(20));
        var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets
            {
                ClientId = _googleAuthConfig.ClientId,
                ClientSecret = _googleAuthConfig.ClientSecret
            },
            Scopes = new[] { GmailService.Scope.GmailSend },
        });
        
        var accessData = await flow.ExchangeCodeForTokenAsync("", token, "postmessage", cancellationToken);
        var payload = await GoogleJsonWebSignature.ValidateAsync(accessData.IdToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _googleAuthConfig.ClientId }
        });

        var accounts = await _mailingAccountsManager.Get(user, ma => ma.Email == payload.Email);
        if (accounts.Any())
        {
            return Error("Mailing account with provided email already exists.");
        }

        var mailingAccount = new MailingAccount();
        _mapper.Map(payload, mailingAccount);
        _mapper.Map(accessData, mailingAccount);
        

        return await _mailingAccountsManager.Create(mailingAccount, user);
    }
}