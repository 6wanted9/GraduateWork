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
    private readonly IMailingAccountManagementService _mailingAccountManagementService;

    public GoogleAuthenticationService(IOptions<GoogleAuthConfig> googleAuthConfig, IMailingAccountManagementService mailingAccountManagementService)
    {
        _mailingAccountManagementService = mailingAccountManagementService;
        _googleAuthConfig = googleAuthConfig.Value;
    }

    public Task Login(string code)
    {
        var authFlow = GenerateAuthFlow();
        return authFlow.ExchangeCodeForTokenAsync(null, code, "postmessage", CancellationToken.None);
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
            DataStore = _mailingAccountManagementService
        });
    }
}