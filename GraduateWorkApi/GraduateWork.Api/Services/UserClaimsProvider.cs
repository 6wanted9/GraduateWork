using System.Security.Claims;
using GraduateWorkApi.Interfaces;

namespace GraduateWorkApi.Services;

internal class UserClaimsProvider : IUserClaimsProvider
{
    private readonly ClaimsPrincipal? _claimsPrincipal;

    public UserClaimsProvider(IHttpContextAccessor httpContext)
    {
        _claimsPrincipal = httpContext?.HttpContext?.User;
    }

    public ClaimsPrincipal Get()
    {
        if (_claimsPrincipal != null)
        {
            return _claimsPrincipal;
        }

        throw new Exception("There is no claims principal in current context.");
    }
}