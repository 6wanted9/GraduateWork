using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IEmailSender
{
    Task<Status> Send(Guid mailingAccountId, Guid emailTemplateId, Guid recipientGroupId);
}