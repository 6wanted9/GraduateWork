using GraduateWork.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduateWork.Infrastructure.EntitiesConfigurations;

public class MailingAccountConfiguration : IEntityTypeConfiguration<MailingAccount>
{
    public void Configure(EntityTypeBuilder<MailingAccount> builder)
    {
        builder.HasKey(ma => ma.Id);
        builder.Property(ma => ma.Name).IsRequired();
        builder.Property(ma => ma.Email).IsRequired();
        builder.Property(ma => ma.AccessToken).IsRequired();
        builder.Property(ma => ma.RefreshToken).IsRequired();
        builder.HasOne(ma => ma.User)
            .WithMany(u => u.MailingAccounts)
            .HasForeignKey(ma => ma.UserId);
    }
}