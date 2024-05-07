using GraduateWork.Infrastructure.Database;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Services;

namespace GraduateWorkApi.Configuration;

public static class ServiceRegistrationExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped(typeof(IUserDependentEntityManager<>), typeof(UserDependentEntityManager<>));
        services.Configure<GoogleAuthConfig>(configuration.GetSection("GoogleAuthIntegration"));
        services.AddScoped<IMailingAccountManagementService, MailingAccountManagementService>();
        services.AddScoped<IEmailSender, EmailSender>();
    }
}