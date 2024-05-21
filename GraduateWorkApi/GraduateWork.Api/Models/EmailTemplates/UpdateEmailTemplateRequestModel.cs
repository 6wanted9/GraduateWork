namespace GraduateWorkApi.Models.EmailTemplates;

public class UpdateEmailTemplateRequestModel : EntityModel
{
    public string Subject { get; set; }
    public string Content { get; set; }
}