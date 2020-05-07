using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Services {
    public class AuditRateService : IAuditRateService {

        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        public AuditRateService (IAuditRateDRepository auditRateDRepository,
            IAuditRateMRepository auditRateMRepository)
             {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
        }

        public async Task<List<SMEScoreRecordDto>> GetLisSMEScoreRecord(PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam, bool isPaging = true)
        {
             var queryAuditRateM = _auditRateMRepository.FindAll ().Where(x => x.Audit_Type1.Trim () == "SME2.0");
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
                    Rating0 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_0),
                    Rating1 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_1),
                    Rating2=queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_2),
                    RatingNa = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA) == null ? 0 : queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA),
            });

            return await PagedList<SMEScoreRecordDto>.CreateAsync (data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }

        public async Task<List<SixsScoreRecordDto>> GetListSixsScoreRecord (PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam, bool isPaging = true) {
            var queryAuditRateM = _auditRateMRepository.FindAll ().Where(x => x.Audit_Type1.Trim () == "6S");
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

            var data = queryAuditRateM.Select (x => new SixsScoreRecordDto {
                AuditDate = x.Record_Date,
                    AuditType = x.Audit_Type1,
                    AuditType2 = x.Audit_Type2,
                    LineId = x.Line,
                    Rating0 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_0),
                    Rating1 = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rating_1),
                    RatingNa = queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA) == null ? 0 : queryAuditRateD.Where (y => y.Record_ID == x.Record_ID).Sum (z => z.Rate_NA),
            });

            return await PagedList<SixsScoreRecordDto>.CreateAsync (data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }
    }
}