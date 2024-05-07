using EntityFrameworkCore.EncryptColumn.Attribute;
using GraduateWork.Infrastructure.Entities.Abstracts;

namespace GraduateWork.Infrastructure.Entities;

public class MailingAccount : Entity, IHasUser
{
    public string Name { get; set; }
    public string Email { get; set; }
    
    [EncryptColumn]
    public string AccessToken { get; set; }
    
    [EncryptColumn]
    public string RefreshToken { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}