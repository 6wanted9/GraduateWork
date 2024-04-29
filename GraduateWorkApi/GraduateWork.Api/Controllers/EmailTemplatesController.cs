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
public class EmailTemplatesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserDependentEntityManager<EmailTemplate> _emailTemplatesManager;

    public EmailTemplatesController(IMapper mapper, IUserDependentEntityManager<EmailTemplate> emailTemplatesManager)
    {
        _mapper = mapper;
        _emailTemplatesManager = emailTemplatesManager;
    }

    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateEmailTemplateRequestModel request)
    {
        var result = await _emailTemplatesManager.Create(_mapper.Map<EmailTemplate>(request), User);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok(_mapper.Map<EntityModel>(result.Value));
    }
    
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update([FromBody] UpdateEmailTemplateRequestModel request)
    {
        var result = await _emailTemplatesManager.Update(request, User);
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
        var result = await _emailTemplatesManager.Delete(request.Id, User);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}