namespace GraduateWorkApi.Models;

public class CreateRecipientGroupRequestModel
{
    public string Name { get; set; }
    public IReadOnlyCollection<string> Recipients { get; set; }
}