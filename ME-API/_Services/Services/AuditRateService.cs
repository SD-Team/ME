using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services {
    public class AuditRateService : IAuditRateService {

        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;

        private readonly IAuditTypeRepository _auditTypeMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        public AuditRateService (IMapper mapper, MapperConfiguration configMapper, IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository) {
            _mapper = mapper;
            _configMapper = configMapper;
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeMRepository = auditTypeMRepository;
            _auditTypeDRepository = auditTypeDRepository;
        }

        public async Task<List<ScoreRecordQuesDto>> GetListQuesScoreRecord (string auditType2, string auditType1) {
            MES_Audit_Type_M auditTypeID;
            if (auditType1 == "精實系統/WS") {
                auditTypeID = _auditTypeMRepository.FindAll ().Where (x => x.Audit_Type1 == auditType1).FirstOrDefault ();
            } else {
                auditTypeID = _auditTypeMRepository.FindAll ().Where (x => x.Audit_Type1 == auditType1 && x.Audit_Type2 == auditType2).FirstOrDefault ();
            }

            List<ScoreRecordQuesDto> data = new List<ScoreRecordQuesDto> ();

            if (auditTypeID != null) {

                var queryAudiiTypeD = _auditTypeDRepository.FindAll ().Where (x => x.Audit_Type_ID.Trim () == auditTypeID.Audit_Type_ID.Trim ());

                data = await queryAudiiTypeD.Select (x => new ScoreRecordQuesDto {
                    Audit_Type_ID = x.Audit_Type_ID,
                        Audit_Item_ID = x.Audit_Item_ID,
                        Quesion = x.Audit_Item_LL
                }).ToListAsync ();

            }
            return data;
        }

        public async Task<string> GetRecordIdRate () {
            string record_Id = "RA" + DateTime.Now.Year.ToString ().Substring (2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString ());
            var item = await _auditRateMRepository.FindAll (x => x.Record_ID.Contains (record_Id)).OrderByDescending (x => x.Record_ID).FirstOrDefaultAsync ();
            if (item != null) {
                var serinumber = item.Record_ID.Substring (7).ToInt ();
                var tmp = (serinumber >= 999) ? (serinumber + 1).ToString () : (serinumber >= 99) ? ("0" + (serinumber + 1)) : (serinumber < 9) ? ("000" + (serinumber + 1)) : ("00" + (serinumber + 1));
                record_Id = "RA" + DateTime.Now.Year.ToString ().Substring (2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString ()) + tmp;
            } else {
                record_Id = "RA" + DateTime.Now.Year.ToString ().Substring (2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString ()) + "0001";
            }
            return record_Id;
        }

        public async Task<bool> SaveScopeRecord (ScoreRecordAnsDto param) {
            string record_Id = await GetRecordIdRate ();
            var auditRateM = _mapper.Map<MES_Audit_Rate_M> (param.auditRateM);
            auditRateM.Record_ID=record_Id;

            var listAuditRateDModel = param.listAuditRateD.Select (x => {
                x.Record_ID = record_Id;
                return x;
            }).ToList ();
            try {

            } catch (System.Exception ex) {

                throw ex;
            }

            ////Save
            // _auditRateMRepository.Add (auditRateM);
            // await _auditRateMRepository.SaveAll ();
            return true;
        }

    }
}