using GraduateWorkApi.Models;

namespace GraduateWorkApi.Interfaces;

public interface IAuthenticationService
{
    Task<string> Register(AuthRequestModel model);
    Task<string> Login(AuthRequestModel model);
}