using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IEmailSender
{
    Task<Status<string>> Send(Guid mailingAccountId, Guid emailTemplateId, Guid recipientGroupId);
}