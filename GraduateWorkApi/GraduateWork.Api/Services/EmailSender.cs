using System.Security.Claims;
using Google.Apis.Auth.OAuth2;
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
    
    public EmailSender(IUserDependentRepository<MailingAccount> mailingAccountRepository)
    {
        _mailingAccountRepository = mailingAccountRepository;
    }
    public async Task<Status> Send(Guid mailingAccountId)
    {
        var mailingAccount = (await _mailingAccountRepository.Get(account => account.Id == mailingAccountId)).SingleOrDefault();
        if (mailingAccount == null)
        {
            return Error();
        }
        
        var emailService = new GmailService(new BaseClientService.Initializer
        {
            HttpClientInitializer = GoogleCredential.FromAccessToken(mailingAccount.AccessToken),
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