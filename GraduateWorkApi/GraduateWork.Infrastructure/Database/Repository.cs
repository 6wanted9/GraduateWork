using System.Linq.Expressions;
using GraduateWork.Infrastructure.Entities.Abstracts;
using Microsoft.EntityFrameworkCore;

namespace GraduateWork.Infrastructure.Database;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
{
    private ApplicationDbContext Context { get; }

    public Repository(ApplicationDbContext context)
    {
        Context = context;
    }
    
    public async Task<List<TEntity>> Get(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes)
    { 
        var query = Context.Set<TEntity>().AsQueryable();
        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (includes.Any())
        {
            query = includes.Aggregate(query, (current, include) => current.Include(include));
        }
        
        if (orderBy != null)
        {
            query = orderBy(query);
        }

        return await query.ToListAsync();
    }
    
    public async Task<TEntity> Add(TEntity entity)
    {
        SetEntityIdIfNeeded(entity);
        var entityEntry = await Context.AddAsync(entity);
        await Context.SaveChangesAsync();

        return entityEntry.Entity;
    }
    
    public async Task<TEntity> Update(TEntity entity)
    {
        var entityEntry = Context.Set<TEntity>().Update(entity);
        await Context.SaveChangesAsync();

        return entityEntry.Entity;
    }
    
    public Task Delete(TEntity entity)
    {
        Context.Remove(entity);

        return Context.SaveChangesAsync();
    }
    
    private static void SetEntityIdIfNeeded(TEntity entity)
    {
        if (entity.Id != default)
        {
            return;
        }

        entity.Id = Guid.NewGuid();
    }
}