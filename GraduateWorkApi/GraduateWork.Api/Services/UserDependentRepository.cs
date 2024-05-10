using System.Linq.Expressions;
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

internal class UserDependentRepository<TEntity> : IUserDependentRepository<TEntity>
    where TEntity : Entity, IHasUser
{
    private const string AccessDeniedMessage = "Access denied.";
    private const string NotFoundMessage = "Not found.";
    
    private readonly IRepository<TEntity> _repository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IUserClaimsProvider _claimsProvider;

    public UserDependentRepository(
        IRepository<TEntity> repository,
        UserManager<ApplicationUser> userManager,
        IMapper mapper,
        IUserClaimsProvider claimsProvider)
    {
        _repository = repository;
        _userManager = userManager;
        _mapper = mapper;
        _claimsProvider = claimsProvider;
    }

    public Task<IEnumerable<TEntity>> Get(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        params Expression<Func<TEntity, object>>[] includes)
    {
        var userClaims = _claimsProvider.Get();
        var userId = _userManager.GetConvertedUserId(userClaims);
        Expression<Func<TEntity, bool>> filterByUserId = entity => entity.UserId == userId;
        
        filter = filter != null ? ExpressionUtils.And(filter, filterByUserId) : filterByUserId;

        return _repository.Get(filter, orderBy, includes);
    }
    
    public Task<Result<TEntity, string>> CreateOrUpdate(TEntity entity)
    {
        return entity.IsNew
            ? this.Create(entity)
            : this.Update(entity);
    }

    public async Task<Result<TEntity, string>> Create(TEntity entity)
    {
        var userClaims = _claimsProvider.Get();
        entity.UserId = _userManager.GetConvertedUserId(userClaims)!.Value;
        return await _repository.Add(entity);
    }
    
    public async Task<Result<TEntity, string>> Update(TEntity entity)
    {
        return await PerformAction(entity, _repository.Update);
    }
    
    public async Task<Result<TEntity, string>> UpdateFromDto<TModel>(TModel updateModel)
        where TModel: EntityModel
    {
        var entity = (await _repository.Get(e => e.Id == updateModel.Id)).SingleOrDefault();
        if (entity == null)
        {
            return Error(NotFoundMessage);
        }
        
        _mapper.Map(updateModel, entity);
        
        return await PerformAction(entity, _repository.Update);
    }
    
    public async Task<Result<TEntity, string>> Delete(Guid entityId)
    {
        var entity = (await _repository.Get(e => e.Id == entityId)).SingleOrDefault();
        if (entity == null)
        {
            return Error(NotFoundMessage);
        }
        
        return await PerformAction(entity, _repository.Delete);
    }
    
    private async Task<Result<TEntity, string>> PerformAction(
        TEntity entity,
        Func<TEntity, Task> action)
    {
        var userClaims = _claimsProvider.Get();
        if (_userManager.GetConvertedUserId(userClaims) != entity.UserId)
        {
            return Error(AccessDeniedMessage);
        }

        await action(entity);

        return entity;
    }
}