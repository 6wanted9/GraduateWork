using AutoMapper;
using GraduateWork.Infrastructure.Entities;
using GraduateWork.Infrastructure.Entities.Abstracts;
using GraduateWorkApi.Constants;
using GraduateWorkApi.Models;

namespace GraduateWorkApi.Configuration;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Entity, EntityModel>();
        CreateMap<CreateEmailTemplateRequestModel, EmailTemplate>();
        CreateMap<UpdateEmailTemplateRequestModel, EmailTemplate>();
        
        CreateMap<CreateRecipientGroupRequestModel, RecipientGroup>()
            .ForMember(
                d => d.Recipients,
                o => o.MapFrom(s => string.Join(RecipientGroupConstants.Delimiter, s.Recipients.Distinct())));
        CreateMap<UpdateRecipientGroupRequestModel, RecipientGroup>()
            .ForMember(
                d => d.Recipients,
                o => o.MapFrom(s => string.Join(RecipientGroupConstants.Delimiter, s.Recipients.Distinct())));
        
        CreateMap<CreateMailingAccountRequestModel, MailingAccount>();
        CreateMap<UpdateMailingAccountRequestModel, MailingAccount>();
    }
}