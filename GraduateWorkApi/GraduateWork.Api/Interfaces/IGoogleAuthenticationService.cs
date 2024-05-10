using Google.Apis.Auth.OAuth2;
using GraduateWorkApi.Models;

namespace GraduateWorkApi.Interfaces;

public interface IGoogleAuthenticationService
{
    Task<GoogleAuthResult> Login(string code, Guid accountId);
    Task<UserCredential> GetCredentials(Guid accountId);
}