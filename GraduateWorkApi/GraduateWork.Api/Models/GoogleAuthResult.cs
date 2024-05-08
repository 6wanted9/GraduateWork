using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Responses;

namespace GraduateWorkApi.Models;

public class GoogleAuthResult
{
    public GoogleAuthResult(TokenResponse accessData, GoogleJsonWebSignature.Payload payloadData)
    {
        AccessData = accessData;
        PayloadData = payloadData;
    }

    public TokenResponse AccessData { get; set; }
    public GoogleJsonWebSignature.Payload PayloadData { get; set; }
}