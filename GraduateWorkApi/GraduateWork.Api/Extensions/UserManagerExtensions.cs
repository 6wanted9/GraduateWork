using System.Security.Claims;
using GraduateWork.Infrastructure.Entities;
using Microsoft.AspNetCore.Identity;

namespace GraduateWorkApi.Extensions;

public static class UserManagerExtensions
{
    public static Guid? GetConvertedUserId(this UserManager<ApplicationUser> userManager, ClaimsPrincipal user)
    {
        var userId = userManager.GetUserId(user);

        return Guid.TryParse(userId, out var userIdConverted) ? userIdConverted : null;
    }
}