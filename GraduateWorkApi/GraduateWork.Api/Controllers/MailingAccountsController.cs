using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWorkApi.Interfaces;
using GraduateWorkApi.Models;
using GraduateWorkApi.Models.MailingAccounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduateWorkApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MailingAccountsController : ControllerBase
{
    private readonly IUserDependentRepository<MailingAccount> _mailingAccountsRepository;
    private readonly IGoogleAuthenticationService _googleAuthenticationService;
    private readonly IMapper _mapper;

    public MailingAccountsController(
        IUserDependentRepository<MailingAccount> mailingAccountsRepository,
        IGoogleAuthenticationService googleAuthenticationService,
        IMapper mapper)
    {
        _mailingAccountsRepository = mailingAccountsRepository;
        _googleAuthenticationService = googleAuthenticationService;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Create(CreateMailingAccountRequestModel request)
    {
        await _googleAuthenticationService.Login(request.Token);
        return Ok();
    }
    
    [Authorize]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete([FromBody] EntityModel request)
    {
        var result = await _mailingAccountsRepository.Delete(request.Id);
        if (result.IsError)
        {
            return NotFound();
        }

        return Ok();
    }
    
    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(List<MailingAccountViewModel>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var mailingAccounts = await _mailingAccountsRepository.Get();

        return Ok(_mapper.Map<List<MailingAccountViewModel>>(mailingAccounts));
    }
}