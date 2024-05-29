using System.Net.Mail;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class RecipientGroupsManager : IRecipientGroupsManager
{
    private const string RecipientsDelimiter = ";";
    private const string NotFoundMessage = "Not found.";
    private const string InvalidRecipientMessage = "There's invalid recipient address among provided list.";

    private readonly IUserDependentRepository<RecipientGroup> _recipientGroupsRepository;

    public RecipientGroupsManager(IUserDependentRepository<RecipientGroup> recipientGroupsRepository)
    {
        _recipientGroupsRepository = recipientGroupsRepository;
    }

    public Task<Result<RecipientGroup, string>> Create(string name, IReadOnlyCollection<string> recipients)
    {
        return CreateOrUpdate(new RecipientGroup(), name, recipients);
    }
    
    public async Task<Result<RecipientGroup, string>> Update(Guid recipientId, string name, IReadOnlyCollection<string> recipients)
    {
        var recipientGroup = (await _recipientGroupsRepository.Get(e => e.Id == recipientId)).SingleOrDefault();
        if (recipientGroup == null)
        {
            return Error(NotFoundMessage);
        }
        
        return await CreateOrUpdate(recipientGroup, name, recipients);
    }
    
    private async Task<Result<RecipientGroup, string>> CreateOrUpdate(
        RecipientGroup recipientGroup,
        string groupName,
        IReadOnlyCollection<string> recipients)
    {
        if (!ValidateRecipients(recipients))
        {
            return Error(InvalidRecipientMessage);
        }

        recipientGroup.Name = groupName;
        recipientGroup.Recipients = string.Join(RecipientsDelimiter, recipients);
        
        return await _recipientGroupsRepository.CreateOrUpdate(recipientGroup);
    }

    private static bool ValidateRecipients(IReadOnlyCollection<string> recipients)
    {
        return recipients.Any() && recipients.All(recipient => MailAddress.TryCreate(recipient, out _));
    }
}