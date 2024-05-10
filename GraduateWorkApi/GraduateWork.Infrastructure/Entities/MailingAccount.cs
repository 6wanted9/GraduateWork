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
    
    [EncryptColumn]
    public string IdToken { get; set; }
    
    public DateTime IssuedUtc { get; set; }
    public string TokenType { get; set; }
    public long? ExpiresInSeconds { get; set; }
    public string Scope { get; set; }
    public string Picture { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; }
}