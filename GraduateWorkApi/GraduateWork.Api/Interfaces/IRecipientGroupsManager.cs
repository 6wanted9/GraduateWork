using GraduateWork.Infrastructure.Entities;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IRecipientGroupsManager
{
    Task<Result<RecipientGroup, string>> Create(string name, IReadOnlyCollection<string> recipients);
    Task<Result<RecipientGroup, string>> Update(Guid recipientId, string name, IReadOnlyCollection<string> recipients);
}