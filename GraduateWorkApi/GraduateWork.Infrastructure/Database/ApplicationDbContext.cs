using EntityFrameworkCore.EncryptColumn.Extension;
using EntityFrameworkCore.EncryptColumn.Interfaces;
using EntityFrameworkCore.EncryptColumn.Util;
using GraduateWork.Infrastructure.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace GraduateWork.Infrastructure.Database;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationUserRole, Guid>
{
    private readonly IEncryptionProvider _encryptionProvider;
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
    {
        _encryptionProvider = new GenerateEncryptionProvider(configuration["EncryptionKey"]);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        modelBuilder.UseEncryption(_encryptionProvider);

        base.OnModelCreating(modelBuilder);
    }
}