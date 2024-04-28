using System.Security.Claims;
using GraduateWork.Infrastructure.Database;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Interfaces;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class UserDependentEntityManager<TEntity> : IUserDependentEntityManager<TEntity>
    where TEntity : Entity, IHasUser
{
    private readonly IRepository<TEntity> _repository;
    private readonly IUserDependentEntityAccessChecker _userDependentEntityAccessChecker;

    public UserDependentEntityManager(
        IRepository<TEntity> repository,
        IUserDependentEntityAccessChecker userDependentEntityAccessChecker)
    {
        _repository = repository;
        _userDependentEntityAccessChecker = userDependentEntityAccessChecker;
    }

    public Task<Result<TEntity, string>> Create(TEntity entity, ClaimsPrincipal user)
    {
        return PerformAction(entity, user, _repository.Add);
    }
    
    public Task<Result<TEntity, string>> Update(TEntity entity, ClaimsPrincipal user)
    {
        return PerformAction(entity, user, _repository.Update);
    }
    
    public Task<Result<TEntity, string>> Delete(TEntity entity, ClaimsPrincipal user)
    {
        return PerformAction(entity, user, _repository.Delete);
    }
    
    private async Task<Result<TEntity, string>> PerformAction(
        TEntity entity,
        ClaimsPrincipal user,
        Func<TEntity, Task> action)
    {
        if (!_userDependentEntityAccessChecker.IsAccessible(entity, user))
        {
            return Error("Access denied.");
        }

        await action(entity);

        return entity;
    }
}