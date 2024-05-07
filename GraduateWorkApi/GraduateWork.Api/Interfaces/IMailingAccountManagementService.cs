using System.Security.Claims;
using GraduateWork.Infrastructure.Entities;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IMailingAccountManagementService
{
    Task<Result<MailingAccount, string>> Create(string token, ClaimsPrincipal user);
}