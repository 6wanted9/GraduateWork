using GraduateWorkApi.Models;

namespace GraduateWorkApi.Interfaces;

public interface IGoogleAuthenticationService
{
    Task<GoogleAuthResult> Login(string code);
}