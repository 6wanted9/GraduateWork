using GraduateWork.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace GraduateWorkApi.Configuration;

public static class ServiceRegistrationExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("Default"));
                options.UseOpenIddict();
            }
        );
    }
}