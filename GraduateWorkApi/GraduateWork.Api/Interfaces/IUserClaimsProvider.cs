using System.Security.Claims;

namespace GraduateWorkApi.Interfaces;

public interface IUserClaimsProvider
{
    ClaimsPrincipal Get();
}