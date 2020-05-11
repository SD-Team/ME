using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services {
    public class SMERecordService : ISMERecordService {
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        private readonly IAuditTypeRepository _auditTypeMRepository;

        public SMERecordService (IAuditRateDRepository auditRateDRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository,
            IAuditRateMRepository auditRateMRepository) {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeDRepository = auditTypeDRepository;
            _auditTypeMRepository = auditTypeMRepository;
        }

        public async Task<PagedList<SMEScoreRecordDto>> GetLisSMEScoreRecord (PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam, bool isPaging = true) {
            var queryAuditRateM = _auditRateMRepository.FindAll ().Where (x => x.Audit_Type1.Trim () == "SME2.0");
            var queryAuditRateD = _auditRateDRepository.FindAll ();
            if (sixsScoreRecordParam.PDC != "") {
                queryAuditRateM = queryAuditRateM.Where (x => x.PDC.Trim () == sixsScoreRecordParam.PDC);
            }
            if (sixsScoreRecordParam.Building != "") {
                queryAuditRateM = queryAuditRateM.Where (x => x.Building.Trim () == sixsScoreRecordParam.Building);
            }
            if (sixsScoreRecordParam.Line != "") {
                queryAuditRateM = queryAuditRateM.Where (x => x.Line.Trim () == sixsScoreRecordParam.Line);
            }
            if (sixsScoreRecordParam.AuditType2 != "") {
                queryAuditRateM = queryAuditRateM.Where (x => x.Audit_Type2.Trim () == sixsScoreRecordParam.AuditType2);
            }
            if (sixsScoreRecordParam.FromDate != "" && sixsScoreRecordParam.ToDate != "") {
                DateTime d1 = Convert.ToDateTime (sixsScoreRecordParam.FromDate + " 00:00:00");
                DateTime d2 = Convert.ToDateTime (sixsScoreRecordParam.ToDate + " 23:59:59");
                queryAuditRateM = queryAuditRateM.Where (x => x.Record_Date >= d1 && x.Record_Date <= d2);
            }

            var data = queryAuditRateM.Select (x => new SMEScoreRecordDto {
                AuditDate = x.Record_Date,
                    AuditType = x.Audit_Type1,
                    AuditType2 = x.Audit_Type2,
                    LineID = x.Line,
                    UpdateBy = x.Updated_By,
                    UpdateTime = x.Updated_Time,
                    Rating0 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_0),
                    Rating1 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_1),
                    Rating2 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_2),
                    RatingNa = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA) == null ? 0 : queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA),
            });

            return await PagedList<SMEScoreRecordDto>.CreateAsync (data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }

    }
}