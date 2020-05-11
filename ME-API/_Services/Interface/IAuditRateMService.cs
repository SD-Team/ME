using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IAuditRateMService : IMEService<AuditRateMDto>
    {
        Task<List<string>> GetAllBuilding();
        Task<List<string>> GetAllLine();
        Task<List<string>> GetAllPDC();
        Task<List<string>> GetAllAuditType2By6s();
        Task<List<string>> GetAllAuditType2BySME();

    }
}