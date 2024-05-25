using Google.Apis.Auth.OAuth2;

namespace GraduateWorkApi.Interfaces;

public interface IGoogleAuthenticationService
{
    Task Login(string code);
    Task Logout(Guid mailingAccountId);
    Task<UserCredential> GetCredentials(Guid accountId);
}