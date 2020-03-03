using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IAuditRecMService : IMEService<AuditRecMDto>
    {
        Task<List<string>> GetAllBuilding();
        Task<List<string>> GetAllLine();
        Task<List<string>> GetAllModelName();
        Task<List<string>> GetAllModelNo();
        Task<List<string>> GetAllPDC();
    }
}