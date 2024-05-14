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
    private readonly IUserDependentRepository<EmailTemplate> _emailTemplateRepository;
    private readonly IUserDependentRepository<RecipientGroup> _recipientGroupRepository;
    private readonly IGoogleAuthenticationService _googleAuthenticationService;
    
    public EmailSender(
        IUserDependentRepository<MailingAccount> mailingAccountRepository,
        IUserDependentRepository<EmailTemplate> emailTemplateRepository,
        IUserDependentRepository<RecipientGroup> recipientGroupRepository,
        IGoogleAuthenticationService googleAuthenticationService)
    {
        _mailingAccountRepository = mailingAccountRepository;
        _googleAuthenticationService = googleAuthenticationService;
        _emailTemplateRepository = emailTemplateRepository;
        _recipientGroupRepository = recipientGroupRepository;
    }
    public async Task<Status<string>> Send(Guid mailingAccountId, Guid emailTemplateId, Guid recipientGroupId)
    {
        var mailingAccount = (await _mailingAccountRepository.Get(account => account.Id == mailingAccountId)).SingleOrDefault();
        if (mailingAccount == null)
        {
            return Error("Mailing account was not found.");
        }

        var credentials = await _googleAuthenticationService.GetCredentials(mailingAccountId);
        var emailService = new GmailService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credentials,
        });
        
        var emailTemplate = (await _emailTemplateRepository.Get(template => template.Id == emailTemplateId)).SingleOrDefault();
        if (emailTemplate == null)
        {
            return Error("Email template was not found.");
        }
        
        var recipientGroup = (await _recipientGroupRepository.Get(group => group.Id == recipientGroupId)).SingleOrDefault();
        if (recipientGroup == null)
        {
            return Error("Recipients group was not found.");
        }

        try
        {
            var message = BuildMessage(emailTemplate, recipientGroup);
            await emailService.Users.Messages.Send(message, mailingAccount.Email).ExecuteAsync();
        }
        catch (Exception e)
        {
            return Error(e.ToString());
        }

        return Ok();
    }

    private static Message BuildMessage(EmailTemplate template, RecipientGroup recipientGroup)
    {
        return new Message()
        {
            Raw = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(
                $"To: {recipientGroup.Recipients}\n" +
                $"Subject: {template.Subject}\n" +
                "Content-Type: text/html; charset=utf-8\r\n\r\n" +
                template.Content))
        };
    }
}