using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Gmail.v1;
using Google.Apis.Util.Store;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.Extensions.Options;

namespace GraduateWorkApi.Services;

internal class GoogleAuthenticationService : IGoogleAuthenticationService
{
    private const string DataStoreFolderName = "Google.Apis.Auth";
    private readonly GoogleAuthConfig _googleAuthConfig;

    public GoogleAuthenticationService(IOptions<GoogleAuthConfig> googleAuthConfig)
    {
        _googleAuthConfig = googleAuthConfig.Value;
    }

    public async Task<GoogleAuthResult> Login(string code, Guid accountId)
    {
        var authFlow = GenerateAuthFlow();
        var accessData = await authFlow.ExchangeCodeForTokenAsync(accountId.ToString(), code, "postmessage", CancellationToken.None);
        var payload = await ValidateAccess(accessData);

        return new GoogleAuthResult(accessData, payload);
    }
    
    public async Task<UserCredential> GetCredentials(Guid accountId)
    {
        var accountIdStringified = accountId.ToString();
        var authFlow = GenerateAuthFlow();
        var accessData = await authFlow.LoadTokenAsync(accountIdStringified, CancellationToken.None);
        if (accessData == null)
        {
            throw new Exception("There's no credentials for provided account.");
        }

        return new UserCredential(authFlow, accountIdStringified, accessData);
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
            DataStore = new FileDataStore(DataStoreFolderName)
        });
    }

    private async Task<GoogleJsonWebSignature.Payload> ValidateAccess(TokenResponse tokenResponse)
    {
        return await GoogleJsonWebSignature.ValidateAsync(tokenResponse.IdToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _googleAuthConfig.ClientId }
        });
    }
}