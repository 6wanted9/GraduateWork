using System.Linq.Expressions;
using System.Security.Claims;
using AutoMapper;
using GraduateWork.Infrastructure.Database;
using GraduateWork.Infrastructure.Entities;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Extensions;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Utils;
using Microsoft.AspNetCore.Identity;
using OperationResult;
using static OperationResult.Helpers;

namespace GraduateWorkApi.Services;

internal class UserDependentEntityManager<TEntity> : IUserDependentEntityManager<TEntity>
    where TEntity : Entity, IHasUser
{
    private const string AccessDeniedMessage = "Access denied.";
    private const string NotFoundMessage = "Not found.";
    
    private readonly IRepository<TEntity> _repository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public UserDependentEntityManager(
        IRepository<TEntity> repository,
        UserManager<ApplicationUser> userManager,
        IMapper mapper)
    {
        _repository = repository;
        _userManager = userManager;
        _mapper = mapper;
    }

    public Task<IEnumerable<TEntity>> Get(
        ClaimsPrincipal user,
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes)
    {
        var userId = _userManager.GetConvertedUserId(user);
        Expression<Func<TEntity, bool>> filterByUserId = entity => entity.UserId == userId;
        filter = filter != null ? ExpressionUtils.And(filter, filterByUserId) : filterByUserId;

        return _repository.Get(filter, orderBy, includes);
    }

    public async Task<Result<TEntity, string>> Create(TEntity entity, ClaimsPrincipal user)
    {
        entity.UserId = _userManager.GetConvertedUserId(user)!.Value;
        return await _repository.Add(entity);
    }
    
    public async Task<Result<TEntity, string>> Update<TModel>(TModel updateModel, ClaimsPrincipal user)
        where TModel: EntityModel
    {
        var entity = (await _repository.Get(e => e.Id == updateModel.Id)).SingleOrDefault();
        if (entity == null)
        {
            return Error(NotFoundMessage);
        }
        
        _mapper.Map(updateModel, entity);
        
        return await PerformAction(entity, user, _repository.Update);
    }
    
    public async Task<Result<TEntity, string>> Delete(Guid entityId, ClaimsPrincipal user)
    {
        var entity = (await _repository.Get(e => e.Id == entityId)).SingleOrDefault();
        if (entity == null)
        {
            return Error(NotFoundMessage);
        }
        
        return await PerformAction(entity, user, _repository.Delete);
    }
    
    private async Task<Result<TEntity, string>> PerformAction(
        TEntity entity,
        ClaimsPrincipal user,
        Func<TEntity, Task> action)
    {
        if (_userManager.GetConvertedUserId(user) != entity.UserId)
        {
            return Error(AccessDeniedMessage);
        }

        await action(entity);

        return entity;
    }
}