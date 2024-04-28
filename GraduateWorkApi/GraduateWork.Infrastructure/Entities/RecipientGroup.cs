using GraduateWork.Infrastructure.Entities.Abstracts;

namespace GraduateWork.Infrastructure.Entities;

public class RecipientGroup : Entity, IHasUser
{
    public string Name { get; set; }
    public string Recipients { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}