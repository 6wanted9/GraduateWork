using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseModel), StatusCodes.Status200OK)]
    public async Task<IActionResult> Login([FromBody] AuthRequestModel request)
    {
        var response = await _authenticationService.Login(request);

        return Ok(new AuthResponseModel(response));
    }

    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    public async Task<IActionResult> Register([FromBody] AuthRequestModel request)
    {
        var response = await _authenticationService.Register(request);

        return Ok(response);
    }
}