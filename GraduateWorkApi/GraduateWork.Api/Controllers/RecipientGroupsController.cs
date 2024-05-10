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
public class RecipientGroupsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserDependentRepository<RecipientGroup> _recipientGroupsRepository;

    public RecipientGroupsController(IMapper mapper, IUserDependentRepository<RecipientGroup> recipientGroupsRepository)
    {
        _mapper = mapper;
        _recipientGroupsRepository = recipientGroupsRepository;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateRecipientGroupRequestModel request)
    {
        var result = await _recipientGroupsRepository.Create(_mapper.Map<RecipientGroup>(request));
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
        var result = await _recipientGroupsRepository.UpdateFromDto(request);
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
        var result = await _recipientGroupsRepository.Delete(request.Id);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}