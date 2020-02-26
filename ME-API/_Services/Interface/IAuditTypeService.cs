using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IAuditTypeService : IMEService<AuditTypeDto>
    {
        Task<bool> CheckAuditTypeExists(string auditTypeId);
    }
}