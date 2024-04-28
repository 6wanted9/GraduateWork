using System.Security.Claims;
using GraduateWork.Infrastructure.Entities.Abstracts;

namespace GraduateWorkApi.Interfaces;

public interface IUserDependentEntityAccessChecker
{
    bool IsAccessible<TEntity>(
        TEntity entity,
        ClaimsPrincipal user)
        where TEntity : Entity, IHasUser;
}