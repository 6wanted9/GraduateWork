using Microsoft.AspNetCore.Identity;

namespace GraduateWork.Infrastructure.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public ICollection<EmailTemplate> EmailTemplates { get; set; }
}