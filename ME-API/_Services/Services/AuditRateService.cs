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

namespace ME_API._Services.Services
{
    public class AuditRateService : IAuditRateService
    {

        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;

        private readonly IAuditTypeRepository _auditTypeMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;

        public AuditRateService(IMapper mapper, MapperConfiguration configMapper, IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeRepository auditTypeMRepository, IAuditTypeDRepository auditTypeDRepository)
        {
            _mapper = mapper;
            _configMapper = configMapper;
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
                    Audit_Type_ID = x.Audit_Type_ID,
                    Audit_Item_ID = x.Audit_Item_ID,
                    Quesion = x.Audit_Item_LL
                }).ToListAsync();

            }
            return data;
        }

        //Get record ID by cường cu to
        public async Task<string> GetRecordIdRate()
        {
            string record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString());
            var item = await _auditRateMRepository.FindAll(x => x.Record_ID.Contains(record_Id)).OrderByDescending(x => x.Record_ID).FirstOrDefaultAsync();
            if (item != null)
            {
                var serinumber = item.Record_ID.Substring(7).ToInt();
                var tmp = (serinumber >= 999) ? (serinumber + 1).ToString() : (serinumber >= 99) ? ("0" + (serinumber + 1)) : (serinumber < 9) ? ("000" + (serinumber + 1)) : ("00" + (serinumber + 1));
                record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString()) + tmp;
            }
            else
            {
                record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString()) + "0001";
            }
            return record_Id;
        }

        public async Task<ScoreRecordDetailDto> GetScoreRecordDetail(string recordId)
        {
            var auditRateMModel = _auditRateMRepository.FindSingle(x => x.Record_ID.Trim() == recordId);
            if (auditRateMModel != null)
            {
                var listAuditRateDModel = _auditRateDRepository.FindAll(x => x.Record_ID == auditRateMModel.Record_ID);
                var listAuditRateD = await listAuditRateDModel.Select(x => new AuditRateDDetailDto
                {
                    AuditItemId = x.Audit_Item_ID,
                    Rating0 = x.Rating_0,
                    Rating1 = x.Rating_1,
                    Rating2 = x.Rating_2,
                    RatingNA = x.Rate_NA,
                    Remark = x.Remark,
                    UplloadPicture = x.Upload_Picture,
                    AuditItemLL = _auditTypeDRepository.GetAuditItemLL(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    AuditItemEN = _auditTypeDRepository.GetAuditItemEN(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    AuditItemZW = _auditTypeDRepository.GetAuditItemZW(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                }).ToListAsync();

                ScoreRecordDetailDto result = new ScoreRecordDetailDto();
                result.auditRateM = _mapper.Map<AuditRateMDto>(auditRateMModel);
                result.listAuditRateD = listAuditRateD;
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> SaveScopeRecord(ScoreRecordAnsDto param)
        {
            string record_Id = await GetRecordIdRate();

            DateTime timeNow = DateTime.Now;

            param.auditRateM.Record_ID = record_Id;
            param.auditRateM.ME_PIC = "HCE";
            param.auditRateM.PD_RESP = "HCE";
            param.auditRateM.Updated_Time = timeNow;

            //Set value record and updateBy  all object in list  
            var listAuditRateDModel = param.listAuditRateD.Select(x =>
            {
                x.Record_ID = record_Id;
                x.Updated_By = param.auditRateM.Updated_By;
                x.Updated_Time = timeNow;
                return x;
            }).ToList();

            //Mapper
            var listAuditRateD = _mapper.Map<List<AuditRateDDto>, List<MES_Audit_Rate_D>>(listAuditRateDModel);
            var auditRateM = _mapper.Map<MES_Audit_Rate_M>(param.auditRateM);

            //Add DB
            _auditRateMRepository.Add(auditRateM);
            _auditRateDRepository.AddMultiple(listAuditRateD);

            try
            {
                //Save
                return await _auditRateDRepository.SaveAll();

            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}