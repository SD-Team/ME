using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services
{
    public class AuditRateService : IAuditRateService
    {

        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;

        private readonly IAuditTypeRepository _auditTypeMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        public AuditRateService(IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository)
        {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeMRepository = auditTypeMRepository;
            _auditTypeDRepository = auditTypeDRepository;
        }

        public async Task<List<ScoreRecordQuesDto>> GetListQuesScoreRecord(string auditType2, string auditType1)
        {
            MES_Audit_Type_M auditTypeID;
            if (auditType1 == "精實系統/WS")
            {
                auditTypeID = _auditTypeMRepository.FindAll().Where(x => x.Audit_Type1 == auditType1).FirstOrDefault();
            }
            else 
            {
                auditTypeID = _auditTypeMRepository.FindAll().Where(x => x.Audit_Type1 == auditType1 && x.Audit_Type2 == auditType2).FirstOrDefault();
            }

            List<ScoreRecordQuesDto> data = new List<ScoreRecordQuesDto>();

            if (auditTypeID != null)
            {

                var queryAudiiTypeD = _auditTypeDRepository.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeID.Audit_Type_ID.Trim());

                data = await queryAudiiTypeD.Select(x => new ScoreRecordQuesDto
                {
                    AuditTypeID = x.Audit_Type_ID,
                    AuditItem = x.Audit_Item_ID,
                    Quesion = x.Audit_Item_LL
                }).ToListAsync();

            }
            return data;
        }

        public Task SaveScopeRecord(ScoreRecordAnsDto param)
        {
            throw new NotImplementedException();
        }
    }
}