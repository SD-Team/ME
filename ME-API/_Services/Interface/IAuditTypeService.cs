using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IAuditTypeService : IMEService<AuditTypeDto>
    {
        Task<List<AuditTypeDto>> GetAuditsByAuditType(AuditType1FormDto formdata);
        Task<List<string>> GetAllAuditType1();
        Task<bool> CheckAuditTypeExists(string auditTypeId);
    }
}