using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Interface
{
    public interface IAuditTypeDService : IMEService<AuditType_D_Dto>
    {
        Task<PagedList<AuditType_D_Dto>> SearchByAuditType(PaginationParams param, string audit_Type1, string audit_Type2);
    }
}