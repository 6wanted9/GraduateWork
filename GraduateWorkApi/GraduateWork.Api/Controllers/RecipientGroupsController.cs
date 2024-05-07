using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RecipientGroupController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserDependentEntityManager<RecipientGroup> _recipientGroupsManager;

    public RecipientGroupController(IMapper mapper, IUserDependentEntityManager<RecipientGroup> recipientGroupsManager)
    {
        _mapper = mapper;
        _recipientGroupsManager = recipientGroupsManager;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateRecipientGroupRequestModel request)
    {
        var result = await _recipientGroupsManager.Create(_mapper.Map<RecipientGroup>(request), User);
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
        var result = await _recipientGroupsManager.Update(request, User);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
    
    [Authorize]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromBody] EntityModel request)
    {
        var result = await _recipientGroupsManager.Delete(request.Id, User);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}