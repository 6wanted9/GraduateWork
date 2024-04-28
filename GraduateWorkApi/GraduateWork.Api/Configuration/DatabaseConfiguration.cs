using GraduateWork.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace GraduateWorkApi.Configuration;

public static class DatabaseConfiguration
{
    public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("Default"));
            }
        );
    }
}