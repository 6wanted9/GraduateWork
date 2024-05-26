namespace GraduateWorkApi.Models.RecipientGroups;

public class RecipientGroupViewModel : EntityModel
{
    public string Name { get; set; }
    public IReadOnlyCollection<string>  Recipients { get; set; }
}