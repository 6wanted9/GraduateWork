namespace GraduateWork.Infrastructure.Entities;

public class EmailTemplate : Entity
{
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}