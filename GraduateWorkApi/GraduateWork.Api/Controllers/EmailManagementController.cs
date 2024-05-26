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
    [HttpPost]
    [Route("send")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Send([FromBody] SendEmailRequestModel request)
    {
        var result = await _emailSender.Send(request.MailingAccountId, request.EmailTemplateId, request.RecipientGroupId);
        if (result.IsError)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
}