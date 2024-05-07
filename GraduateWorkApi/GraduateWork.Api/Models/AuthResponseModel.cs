namespace GraduateWorkApi.Models;

public class AuthResponseModel
{
    public AuthResponseModel(string accessToken)
    {
        AccessToken = accessToken;
    }

    public string AccessToken { get; set; }
}