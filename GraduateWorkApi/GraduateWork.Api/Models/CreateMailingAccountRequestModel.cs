namespace GraduateWorkApi.Models;

public class CreateMailingAccountRequestModel
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
}