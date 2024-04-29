using System.Security.Claims;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Models;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IUserDependentEntityManager<TEntity> where TEntity : Entity
{
    Task<Result<TEntity, string>> Create(TEntity entity, ClaimsPrincipal user);
    Task<Result<TEntity, string>> Update<TModel>(TModel updateModel, ClaimsPrincipal user) where TModel: EntityModel;
    Task<Result<TEntity, string>> Delete(Guid entityId, ClaimsPrincipal user);
}