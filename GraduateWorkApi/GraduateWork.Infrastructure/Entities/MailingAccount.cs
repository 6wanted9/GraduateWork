using EntityFrameworkCore.EncryptColumn.Attribute;
using GraduateWork.Infrastructure.Entities.Abstracts;

namespace GraduateWork.Infrastructure.Entities;

public class MailingAccount : Entity, IHasUser
{
    public string Name { get; set; }
    public string Email { get; set; }
    
    [EncryptColumn]
    public string ClientId { get; set; }
    
    [EncryptColumn]
    public string ClientSecret { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}