using System;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Services.Services
{
    public class WaterSpiderRecordService : IWaterSpiderRecordService
    {
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        private readonly IAuditTypeRepository _auditTypeMRepository;

        public WaterSpiderRecordService(IAuditRateDRepository auditRateDRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository,
            IAuditRateMRepository auditRateMRepository)
        {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeDRepository = auditTypeDRepository;
            _auditTypeMRepository = auditTypeMRepository;
        }
        public async Task<PagedList<WaterSpiderScoreRecordDto>> GetLisWaterSpiderScoreRecord(PaginationParams paginationParams, ScoreRecordParam scoreRecordParam, bool isPaging = true)
        {
            var queryAuditRateM = _auditRateMRepository.FindAll().Where(x => x.Audit_Type1.Trim() == "精實系統/WS");
            var queryAuditRateD = _auditRateDRepository.FindAll();
            if (scoreRecordParam.PDC != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.PDC.Trim() == scoreRecordParam.PDC);
            }
            if (scoreRecordParam.Building != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Building.Trim() == scoreRecordParam.Building);
            }
            if (scoreRecordParam.Line != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Line.Trim() == scoreRecordParam.Line);
            }
            if (scoreRecordParam.FromDate != "" && scoreRecordParam.ToDate != "")
            {
                DateTime d1 = Convert.ToDateTime(scoreRecordParam.FromDate + " 00:00:00");
                DateTime d2 = Convert.ToDateTime(scoreRecordParam.ToDate + " 23:59:59");
                queryAuditRateM = queryAuditRateM.Where(x => x.Record_Date >= d1 && x.Record_Date <= d2);
            }

            var data = queryAuditRateM.Select(x => new WaterSpiderScoreRecordDto
            {
                RecordId = x.Record_ID,
                AuditType = x.Audit_Type1,
                AuditDate = x.Record_Date,
                LineId = x.PDC + " + " + x.Building + " + " + x.Line,
                Score = _auditRateDRepository.SumEachRating1InAuditTypeDAndAuditRateD(x.Record_ID)
            });

            return await PagedList<WaterSpiderScoreRecordDto>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }

        public int SumEachRating1InAuditTypeDAndAuditRateD(string recordId)
        {
            var auditTypeM = _auditTypeMRepository.FindAll().Where(x => x.Audit_Type1.Trim() == "精實系統/WS").FirstOrDefault();
            var listAuditTypeD = _auditTypeDRepository.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeM.Audit_Type_ID.Trim()).ToList();
            var listAuditRateD = _auditRateDRepository.FindAll().Where(x => x.Record_ID == recordId).ToList();

            // biến lưu tổng của tích từng phần tử 
            int result = 0;
            foreach (var i in listAuditTypeD)
            {
                foreach (var j in listAuditRateD)
                {
                    if (i.Audit_Item_ID == j.Audit_Item_ID)
                    {
                        result += i.Rating_1 * j.Rating_1;
                    }
                }
            }
            return result;
        }

    }
}