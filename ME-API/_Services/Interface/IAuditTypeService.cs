using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.ViewModel;

namespace ME_API._Services.Interface
{
    public interface IAuditTypeService : IMEService<AuditTypeDto>
    {
        Task<List<AuditTypeDto>> GetAuditsByAuditType(AuditType1FormDto formdata);
        Task<List<string>> GetAllAuditType1();
        Task<bool> CheckAuditTypeExists(string auditTypeId);
        Task<List<AuditTypeViewModel>> GetAuditType_1_2_Vesion();
    }
}