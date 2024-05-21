using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Models.EmailTemplates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmailTemplatesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserDependentRepository<EmailTemplate> _emailTemplatesRepository;

    public EmailTemplatesController(IMapper mapper, IUserDependentRepository<EmailTemplate> emailTemplatesRepository)
    {
        _mapper = mapper;
        _emailTemplatesRepository = emailTemplatesRepository;
    }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(List<EmailTemplateViewModel>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var emailTemplates = await _emailTemplatesRepository.Get();

        return Ok(_mapper.Map<List<EmailTemplateViewModel>>(emailTemplates));
    }
    
    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(EntityModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateEmailTemplateRequestModel request)
    {
        var result = await _emailTemplatesRepository.Create(_mapper.Map<EmailTemplate>(request));
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok(_mapper.Map<EntityModel>(result.Value));
    }
    
    [Authorize]
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update([FromBody] UpdateEmailTemplateRequestModel request)
    {
        var result = await _emailTemplatesRepository.UpdateFromDto(request);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
    
    [Authorize]
    [HttpDelete]
    [Route("/{emailTemplateId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromRoute] Guid emailTemplateId)
    {
        var result = await _emailTemplatesRepository.Delete(emailTemplateId);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
}