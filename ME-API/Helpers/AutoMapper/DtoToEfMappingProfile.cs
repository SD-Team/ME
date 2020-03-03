using ME_API.DTO;
using ME_API.Models;
using AutoMapper;

namespace ME_API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile()
        {
            CreateMap<UserForDetailDto, MES_User>();
            CreateMap<BrandDto, MES_Audit_Brand>();
            CreateMap<AuditTypeDto, MES_Audit_Type_M>();
            CreateMap<AuditType_D_Dto, MES_Audit_Type_D>();
            CreateMap<AuditPicMDto, MES_Audit_PIC_M>();
            CreateMap<AuditPicDDto, MES_Audit_PIC_D>();
            CreateMap<AuditRecMDto, MES_Audit_Rec_M>();
            CreateMap<AuditRecDDto, MES_Audit_Rec_D>();
        }
    }
}