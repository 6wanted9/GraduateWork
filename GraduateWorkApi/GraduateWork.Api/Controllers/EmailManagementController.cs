using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmailManagementController : ControllerBase
{
    private readonly IEmailSender _emailSender;

    public EmailManagementController(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }
    
    [Authorize]
    [HttpGet]
    [Route("{mailingAccountId}/send")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Send([FromRoute] Guid mailingAccountId, [FromBody] SendEmailRequestModel request)
    {
        var result = await _emailSender.Send(mailingAccountId, request.EmailTemplateId, request.RecipientGroupId);
        if (result.IsError)
        {
            return BadRequest();
        }

        return Ok();
    }
}