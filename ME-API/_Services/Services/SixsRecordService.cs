using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services
{
    public class SixsRecordService : ISixsRecordService
    {
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IAuditTypeRepository _auditTypeMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        public SixsRecordService(IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository)
        {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeMRepository = auditTypeMRepository;
            _auditTypeDRepository = auditTypeDRepository;
        }


        public async Task<PagedList<SixsScoreRecordDto>> GetListSixsScoreRecord(PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam, bool isPaging = true)
        {
            var queryAuditRateM = _auditRateMRepository.FindAll().Where(x => x.Audit_Type1.Trim() == "6S");
            var queryAuditRateD = _auditRateDRepository.FindAll();
            if (sixsScoreRecordParam.PDC != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.PDC.Trim() == sixsScoreRecordParam.PDC);
            }
            if (sixsScoreRecordParam.Building != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Building.Trim() == sixsScoreRecordParam.Building);
            }
            if (sixsScoreRecordParam.Line != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Line.Trim() == sixsScoreRecordParam.Line);
            }
            if (sixsScoreRecordParam.AuditType2 != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Audit_Type2.Trim() == sixsScoreRecordParam.AuditType2);
            }
            if (sixsScoreRecordParam.FromDate != "" && sixsScoreRecordParam.ToDate != "")
            {
                DateTime d1 = Convert.ToDateTime(sixsScoreRecordParam.FromDate + " 00:00:00");
                DateTime d2 = Convert.ToDateTime(sixsScoreRecordParam.ToDate + " 23:59:59");
                queryAuditRateM = queryAuditRateM.Where(x => x.Record_Date >= d1 && x.Record_Date <= d2);
            }

            var data = queryAuditRateM.OrderByDescending(x => x.Updated_Time).Select(x => new SixsScoreRecordDto
            {
                RecordId = x.Record_ID,
                AuditDate = x.Record_Date,
                AuditType = x.Audit_Type1,
                AuditType2 = x.Audit_Type2,
                LineId = x.PDC + " + " + x.Building + " + " + x.Line,
                UpdateBy = x.Updated_By,
                UpdateTime = x.Updated_Time,
                Rating0 = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rating_0),
                Rating1 = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rating_1),
                RatingNa = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rate_NA) == null ? 0 : queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rate_NA),
            });

            return await PagedList<SixsScoreRecordDto>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }
    }
}