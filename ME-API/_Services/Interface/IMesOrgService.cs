using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IMesOrgService : IMEService<MesOrgDto>
    {
        Task<List<string>> GetAllPDC();
        Task<List<string>> GetAllBuilding();
        Task<List<string>> GetAllLineID();
    }
}