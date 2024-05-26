using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Models.RecipientGroups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RecipientGroupsController : ControllerBase
{
    private readonly IRecipientGroupsManager _recipientGroupsManager;
    private readonly IMapper _mapper;
    private readonly IUserDependentRepository<RecipientGroup> _recipientGroupsRepository;

    public RecipientGroupsController(
        IRecipientGroupsManager recipientGroupsManager,
        IMapper mapper,
        IUserDependentRepository<RecipientGroup> recipientGroupsRepository)
    {
        _recipientGroupsManager = recipientGroupsManager;
        _mapper = mapper;
        _recipientGroupsRepository = recipientGroupsRepository;
    }

    
    [Authorize]
    [HttpGet]
    [Route("{recipientGroupId}")]
    [ProducesResponseType(typeof(List<RecipientGroupViewModel>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get([FromRoute] Guid recipientGroupId)
    {
        var recipientGroups = await _recipientGroupsRepository.Get(t => t.Id == recipientGroupId);

        return Ok(_mapper.Map<RecipientGroupViewModel>(recipientGroups.SingleOrDefault()));
    }
    
    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(RecipientGroupViewModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var emailTemplates = await _recipientGroupsRepository.Get();

        return Ok(_mapper.Map<List<RecipientGroupViewModel>>(emailTemplates));
    }
    
    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateRecipientGroupRequestModel request)
    {
        var result = await _recipientGroupsManager.Create(request.Name, request.Recipients);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok(_mapper.Map<EntityModel>(result.Value));
    }
    
    [Authorize]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update([FromBody] UpdateRecipientGroupRequestModel request)
    {
        var result = await _recipientGroupsManager.Update(request.Id, request.Name, request.Recipients);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
    
    [Authorize]
    [HttpDelete]
    [Route("{recipientGroupId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromRoute] Guid recipientGroupId)
    {
        var result = await _recipientGroupsRepository.Delete(recipientGroupId);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}