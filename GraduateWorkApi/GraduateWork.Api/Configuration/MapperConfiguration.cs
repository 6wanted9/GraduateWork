using AutoMapper;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Responses;
using GraduateWork.Infrastructure.Entities;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Models;
using GraduateWorkApi.Models.EmailTemplates;
using GraduateWorkApi.Models.MailingAccounts;
using GraduateWorkApi.Models.RecipientGroups;

namespace GraduateWorkApi.Configuration;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Entity, EntityModel>();
        CreateMap<CreateEmailTemplateRequestModel, EmailTemplate>();
        CreateMap<UpdateEmailTemplateRequestModel, EmailTemplate>();
        CreateMap<EmailTemplate, EmailTemplateViewModel>();
        
        CreateMap<RecipientGroup, RecipientGroupViewModel>()
            .ForMember(
                m => m.Recipients,
                o => o.MapFrom(s => s.Recipients.Split(';', StringSplitOptions.None)));
        
        CreateMap<TokenResponse, MailingAccount>().ReverseMap();
        CreateMap<MailingAccount, MailingAccountViewModel>().ReverseMap();
        CreateMap<GoogleJsonWebSignature.Payload, MailingAccount>();
    }
}