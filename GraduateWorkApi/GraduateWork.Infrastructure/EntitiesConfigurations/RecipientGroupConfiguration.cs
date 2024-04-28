using GraduateWork.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduateWork.Infrastructure.EntitiesConfigurations;

public class RecipientGroupConfiguration : IEntityTypeConfiguration<RecipientGroup>
{
    public void Configure(EntityTypeBuilder<RecipientGroup> builder)
    {
        builder.HasKey(et => et.Id);
        builder.HasOne(et => et.User)
            .WithMany(u => u.RecipientGroups)
            .HasForeignKey(et => et.UserId);
    }
}