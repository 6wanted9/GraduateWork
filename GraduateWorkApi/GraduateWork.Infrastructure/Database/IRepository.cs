using System.Linq.Expressions;
using GraduateWork.Infrastructure.Entities;

namespace GraduateWork.Infrastructure.Database;

public interface IRepository<TEntity> where TEntity : Entity
{
    Task<IEnumerable<TEntity>> Get(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes);
    
    Task<TEntity> Add(TEntity entity);
    Task<TEntity> Update(TEntity entity);
    Task Delete(TEntity entity);
}