using GraduateWork.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduateWork.Infrastructure.EntitiesConfigurations;

public class RecipientGroupConfiguration : IEntityTypeConfiguration<RecipientGroup>
{
    public void Configure(EntityTypeBuilder<RecipientGroup> builder)
    {
        builder.HasKey(rg => rg.Id);
        builder.Property(rg => rg.Name).IsRequired();
        builder.Property(rg => rg.Recipients).IsRequired();
        builder.HasOne(rg => rg.User)
            .WithMany(u => u.RecipientGroups)
            .HasForeignKey(rg => rg.UserId);
    }
}