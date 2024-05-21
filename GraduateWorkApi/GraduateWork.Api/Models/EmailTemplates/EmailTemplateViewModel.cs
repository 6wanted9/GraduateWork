namespace GraduateWorkApi.Models.EmailTemplates;

public class EmailTemplateViewModel: EntityModel
{
    public string Subject { get; set; }
    public string Content { get; set; }
}