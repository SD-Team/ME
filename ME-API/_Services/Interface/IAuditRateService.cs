using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Interface {
    public interface IAuditRateService {

        Task<List<ScoreRecordQuesDto>> GetListQuesScoreRecord (string auditType2, string auditType1);

        Task<bool> SaveScopeRecord (ScoreRecordAnsDto param);

        Task<string> GetRecordIdRate ();
        Task<ScoreRecordDetailDto> GetScoreRecordDetail (string recordId);

        Task<object> GetMEPIC();
        Task<object> GetPDRESP();
    }
}