using GraduateWork.Infrastructure.Entities.Abstracts;

namespace GraduateWork.Infrastructure.Entities;

public class EmailTemplate : Entity, IHasUser
{
    public string Subject { get; set; }
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}