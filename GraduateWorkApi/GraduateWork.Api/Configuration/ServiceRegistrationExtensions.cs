using GraduateWork.Infrastructure.Database;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Services;

namespace GraduateWorkApi.Configuration;

public static class ServiceRegistrationExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    }
}