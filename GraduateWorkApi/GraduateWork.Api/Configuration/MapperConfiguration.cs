using AutoMapper;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Responses;
using GraduateWork.Infrastructure.Entities;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Models;

namespace GraduateWorkApi.Configuration;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Entity, EntityModel>();
        CreateMap<CreateEmailTemplateRequestModel, EmailTemplate>();
        CreateMap<UpdateEmailTemplateRequestModel, EmailTemplate>();
        
        CreateMap<TokenResponse, MailingAccount>().ReverseMap();
        CreateMap<GoogleJsonWebSignature.Payload, MailingAccount>();
    }
}