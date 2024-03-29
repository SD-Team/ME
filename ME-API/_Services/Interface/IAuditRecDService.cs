using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.ViewModel;

namespace ME_API._Services.Interface
{
    public interface IAuditRecDService : IMEService<AuditRecDDto>
    {
        Task<PagedList<AuditRecDto>> GetAllAuditRecViewModel(PaginationParams param);
        Task<List<string>> GetAllStatus();
        Task<PagedList<AuditRecDto>> SearchByModel(PaginationParams param, AuditRecSearch model);
        Task<List<AuditRecDto>> GetAllExcel();
        Task<List<AuditRecDto>> SearchExcel(AuditRecSearch model);
        Task<bool> AddRecD(AuditRecDViewModel model);
        Task<bool> UpdateRecD(AuditRecDViewModel model);
    }
}