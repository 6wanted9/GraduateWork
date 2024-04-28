namespace GraduateWork.Infrastructure.Entities.Abstracts;

public interface IHasUser
{
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}