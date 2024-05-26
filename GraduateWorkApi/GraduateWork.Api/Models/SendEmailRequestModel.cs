namespace GraduateWorkApi.Models;

public class SendEmailRequestModel
{
    public Guid MailingAccountId { get; set; }
    public Guid EmailTemplateId { get; set; }
    public Guid RecipientGroupId { get; set; }
}