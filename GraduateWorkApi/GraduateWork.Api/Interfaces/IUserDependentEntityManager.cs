using System.Security.Claims;
using GraduateWork.Infrastructure.Entities.Abstracts;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IUserDependentEntityManager<TEntity> where TEntity : Entity
{
    Task<Result<TEntity, string>> Create(TEntity entity, ClaimsPrincipal user);
    Task<Result<TEntity, string>> Update(TEntity entity, ClaimsPrincipal user);
    Task<Result<TEntity, string>> Delete(TEntity entity, ClaimsPrincipal user);
}