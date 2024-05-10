namespace GraduateWorkApi.Models;

public class UpdateEmailTemplateRequestModel : EntityModel
{
    public string Subject { get; set; }
    public string Content { get; set; }
}