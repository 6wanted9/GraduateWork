using System.Security.Claims;
using GraduateWork.Infrastructure.Entities;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace GraduateWorkApi.Services;

internal class UserDependentEntityAccessChecker : IUserDependentEntityAccessChecker
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserDependentEntityAccessChecker(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public bool IsAccessible<TEntity>(
        TEntity entity,
        ClaimsPrincipal user)
        where TEntity : Entity, IHasUser
    {
        var userId = _userManager.GetUserId(user);
        
        return Guid.TryParse(userId, out var userIdConverted) && userIdConverted == entity.UserId;
    }
}