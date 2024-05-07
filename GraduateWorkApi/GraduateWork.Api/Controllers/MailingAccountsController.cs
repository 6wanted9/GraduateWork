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
    private readonly IMailingAccountManagementService _mailingAccountManagementService;

    public MailingAccountsController(
        IMapper mapper,
        IUserDependentEntityManager<MailingAccount> mailingAccountsManager,
        IMailingAccountManagementService mailingAccountManagementService)
    {
        _mapper = mapper;
        _mailingAccountsManager = mailingAccountsManager;
        _mailingAccountManagementService = mailingAccountManagementService;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create(CreateMailingAccountRequestModel request)
    {
        var result = await _mailingAccountManagementService.Create(request.Token, User);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok(_mapper.Map<EntityModel>(result.Value));
    }
    
    [Authorize]
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
    
    [Authorize]
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