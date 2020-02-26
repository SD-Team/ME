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
        }
    }
}