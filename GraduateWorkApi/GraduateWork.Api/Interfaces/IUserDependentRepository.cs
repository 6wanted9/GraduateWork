using System.Linq.Expressions;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Models;
using OperationResult;

namespace GraduateWorkApi.Interfaces;

public interface IUserDependentRepository<TEntity> where TEntity : Entity
{
    Task<IEnumerable<TEntity>> Get(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes);
    
    Task<Result<TEntity, string>> Create(TEntity entity);
    Task<Result<TEntity, string>> Update<TModel>(TModel updateModel) where TModel: EntityModel;
    Task<Result<TEntity, string>> Delete(Guid entityId);
}