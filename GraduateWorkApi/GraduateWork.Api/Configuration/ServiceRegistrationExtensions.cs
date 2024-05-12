using GraduateWork.Infrastructure.Database;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Services;

namespace GraduateWorkApi.Configuration;

public static class ServiceRegistrationExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        services.Configure<GoogleAuthConfig>(configuration.GetSection("GoogleAuthIntegration"));
        
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped(typeof(IUserDependentRepository<>), typeof(UserDependentRepository<>));

        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IUserClaimsProvider, UserClaimsProvider>();
        services.AddScoped<IGoogleAuthenticationService, GoogleAuthenticationService>();
        services.AddScoped<IMailingAccountManagementService, MailingAccountManagementService>();
        services.AddScoped<IEmailSender, EmailSender>();
        services.AddScoped<IRecipientGroupsManager, RecipientGroupsManager>();
    }
}