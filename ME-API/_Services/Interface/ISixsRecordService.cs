using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Interface
{
    public interface ISixsRecordService
    {
           Task<PagedList<SixsScoreRecordDto>> GetListSixsScoreRecord(PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam, bool isPaging = true);

           
    }
}