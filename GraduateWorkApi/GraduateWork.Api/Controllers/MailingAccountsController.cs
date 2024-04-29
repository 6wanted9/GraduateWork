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
public class MailingAccountsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserDependentEntityManager<MailingAccount> _mailingAccountsManager;

    public MailingAccountsController(IMapper mapper, IUserDependentEntityManager<MailingAccount> mailingAccountsManager)
    {
        _mapper = mapper;
        _mailingAccountsManager = mailingAccountsManager;
    }

    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateMailingAccountRequestModel request)
    {
        var result = await _mailingAccountsManager.Create(_mapper.Map<MailingAccount>(request), User);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok(_mapper.Map<EntityModel>(result.Value));
    }
    
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update([FromBody] UpdateMailingAccountRequestModel request)
    {
        var result = await _mailingAccountsManager.Update(request, User);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromBody] EntityModel request)
    {
        var result = await _mailingAccountsManager.Delete(request.Id, User);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}