using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class MailingAccountManagementService : IMailingAccountManagementService
{
    private readonly IUserDependentRepository<MailingAccount> _mailingAccountsRepository;
    private readonly IMapper _mapper;
    private readonly IGoogleAuthenticationService _googleAuthenticationService;

    public MailingAccountManagementService(
        IUserDependentRepository<MailingAccount> mailingAccountsRepository,
        IMapper mapper,
        IGoogleAuthenticationService googleAuthenticationService)
    {
        _mailingAccountsRepository = mailingAccountsRepository;
        _mapper = mapper;
        _googleAuthenticationService = googleAuthenticationService;
    }

    public async Task<Result<MailingAccount, string>> Create(string token)
    {
        var googleAuthResult = await _googleAuthenticationService.Login(token);
        var accounts = await _mailingAccountsRepository.Get(ma => ma.Email == googleAuthResult.PayloadData.Email);
        if (accounts.Any())
        {
            return Error("Mailing account with provided email already exists.");
        }

        var mailingAccount = new MailingAccount();
        _mapper.Map(googleAuthResult.PayloadData, mailingAccount);
        _mapper.Map(googleAuthResult.AccessData, mailingAccount);

        return await _mailingAccountsRepository.Create(mailingAccount);
    }
}