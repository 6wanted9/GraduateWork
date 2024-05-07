using System.Security.Claims;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IEmailSender
{
    Task<Status> Send(ClaimsPrincipal user, Guid mailingAccountId);
}