namespace GraduateWorkApi.Models;

public class UpdateMailingAccountRequestModel : EntityModel
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}