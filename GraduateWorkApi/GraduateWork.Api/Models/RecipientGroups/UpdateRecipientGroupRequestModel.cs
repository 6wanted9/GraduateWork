namespace GraduateWorkApi.Models.RecipientGroups;

public class UpdateRecipientGroupRequestModel : EntityModel
{
    public string Name { get; set; }
    public IReadOnlyCollection<string> Recipients { get; set; }
}