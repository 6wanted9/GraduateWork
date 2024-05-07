using GraduateWorkApi.Interfaces;
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
    public async Task<IActionResult> Send([FromRoute] Guid mailingAccountId)
    {
        var result = await _emailSender.Send(User, mailingAccountId);
        if (result.IsError)
        {
            return BadRequest();
        }

        return Ok();
    }
}