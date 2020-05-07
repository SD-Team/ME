using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Interface
{
    public interface IAuditRateService
    {
        Task<List<SixsScoreRecordDto>> GetListSixsScoreRecord(PaginationParams paginationParams, SixsScoreRecordParam sixsScoreRecordParam, bool isPaging = true);
         
    }
}