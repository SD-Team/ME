using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Services.Interface
{
    public interface IAuditPicDService : IMEService<AuditPicDDto>
    {
        Task<List<string>> GetAllPdPic();
        Task<List<string>> GetAllMePic();
    }
}