using System.Linq.Expressions;
using System.Security.Claims;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Models;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IUserDependentEntityManager<TEntity> where TEntity : Entity
{
    Task<IEnumerable<TEntity>> Get(
        ClaimsPrincipal user,
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes);
    
    Task<Result<TEntity, string>> Create(TEntity entity, ClaimsPrincipal user);
    Task<Result<TEntity, string>> Update<TModel>(TModel updateModel, ClaimsPrincipal user) where TModel: EntityModel;
    Task<Result<TEntity, string>> Delete(Guid entityId, ClaimsPrincipal user);
}