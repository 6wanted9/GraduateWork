using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Gmail.v1;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.Extensions.Options;

namespace GraduateWorkApi.Services;

internal class GoogleAuthenticationService : IGoogleAuthenticationService
{
    private readonly GoogleAuthConfig _googleAuthConfig;

    public GoogleAuthenticationService(IOptions<GoogleAuthConfig> googleAuthConfig)
    {
        _googleAuthConfig = googleAuthConfig.Value;
    }

    public async Task<GoogleAuthResult> Login(string code)
    {
        var authFlow = GenerateAuthFlow();
        var accessData = await authFlow.ExchangeCodeForTokenAsync("", code, "postmessage", CancellationToken.None);
        var payload = await GoogleJsonWebSignature.ValidateAsync(accessData.IdToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _googleAuthConfig.ClientId }
        });

        return new GoogleAuthResult(accessData, payload);
    }

    private GoogleAuthorizationCodeFlow GenerateAuthFlow()
    {
        return new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets
            {
                ClientId = _googleAuthConfig.ClientId,
                ClientSecret = _googleAuthConfig.ClientSecret
            },
            Scopes = new[] { GmailService.Scope.GmailSend },
        });
    }
}