using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class EmailSender : IEmailSender
{
    private readonly IUserDependentRepository<MailingAccount> _mailingAccountRepository;
    private readonly IGoogleAuthenticationService _googleAuthenticationService;
    
    public EmailSender(IUserDependentRepository<MailingAccount> mailingAccountRepository, IGoogleAuthenticationService googleAuthenticationService)
    {
        _mailingAccountRepository = mailingAccountRepository;
        _googleAuthenticationService = googleAuthenticationService;
    }
    public async Task<Status> Send(Guid mailingAccountId)
    {
        var mailingAccount = (await _mailingAccountRepository.Get(account => account.Id == mailingAccountId)).SingleOrDefault();
        if (mailingAccount == null)
        {
            return Error();
        }

        var credentials = await _googleAuthenticationService.GetCredentials(mailingAccountId);
        var emailService = new GmailService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credentials,
        });
        
        var message = new Message()
        {
            Raw = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(
                $"To: {"dkatanov2002@gmail.com"}\n" +
                "Subject: " + "someSubject" + "\n" +
                "\n" +
                "Email body"))
        };

        await emailService.Users.Messages.Send(message, mailingAccount.Email).ExecuteAsync();

        return Ok();
    }
}