using GraduateWork.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduateWork.Infrastructure.EntitiesConfigurations;

public class EmailTemplateConfiguration : IEntityTypeConfiguration<EmailTemplate>
{
    public void Configure(EntityTypeBuilder<EmailTemplate> builder)
    {
        builder.HasKey(et => et.Id);
        builder.Property(et => et.Subject).IsRequired();
        builder.Property(et => et.Content).IsRequired();
        builder.HasOne(et => et.User)
            .WithMany(u => u.EmailTemplates)
            .HasForeignKey(et => et.UserId);
    }
}