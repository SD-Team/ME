using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using ME_API.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services
{
    public class AuditRecDService : IAuditRecDService
    {
        private readonly IAuditRecMRepository _repoAuditRecM;
        private readonly IAuditRecDRepository _repoAuditRecD;
        private readonly IAuditTypeRepository _repoAuditTypeM;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditRecDService(IAuditRecDRepository repoAuditRecD,
                                IAuditRecMRepository repoAuditRecM,
                                IAuditTypeRepository repoAuditTypeM,
                                IMapper mapper,
                                MapperConfiguration configMapper) {
            _repoAuditRecD = repoAuditRecD;
            _repoAuditRecM = repoAuditRecM;
            _repoAuditTypeM = repoAuditTypeM;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public Task<bool> Add(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<AuditRecDDto>> GetAllAsync()
        {
            var lists = await _repoAuditRecD.FindAll().ProjectTo<AuditRecDDto>(_configMapper)
                        .OrderByDescending(x => x.Updated_Time).ToListAsync();
            return lists;
        }

        public async Task<PagedList<AuditRecDto>> GetAllAuditRecViewModel(PaginationParams param)
        {
            var listAuditRecM =  _repoAuditRecM.FindAll();
            var listAuditRecD =  _repoAuditRecD.FindAll();
            // var listAuditRecDto =  (from b in listAuditRecD 
            //                         join a in listAuditRecM on b.Record_ID equals a.Record_ID into c
            //                         from m in c.DefaultIfEmpty()
            //                         select new AuditRecDto()
            //                         {
            //                             Record_ID = m.Record_ID, Record_Time = m.Record_Time,
            //                             Line = m.Line, Model_Name = m.Model_Name,
            //                             Model_No = m.Model_No, Item_no = b.Item_no,
            //                             Status = b.Status, ERCS = b.ERCS,
            //                             //Audit_Type_ID = b.Audit_Type_ID,
            //                             Audit_Type_ID = _repoAuditTypeM.FindById(b.Audit_Type_ID.ToString()).Audit_Type1,
            //                             Audit_Item = b.Audit_Item, Issue_ZW = b.Issue_ZW,
            //                             Issue_LL = b.Issue_LL, Issue_EN = b.Issue_EN,
            //                             Before_Picture = b.Before_Picture, After_Picture = b.After_Picture,
            //                             PD_PIC = b.PD_PIC, PD_RESP = b.PD_RESP,
            //                             ME_PIC = b.ME_PIC, Finished_Date = b.Finished_Date,
            //                             Implement_User = b.Implement_User,Implement_Time = b.Implement_Time
            //                         }).Distinct().OrderByDescending(x => x.Implement_Time);
                    var listAuditRecDto = listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new AuditRecDto
                        {
                            Record_ID = x.Record_ID,
                            Record_Time = y.Record_Time,
                            After_Picture = x.After_Picture,
                            Audit_Item = x.Audit_Item,
                            Audit_Type_ID = x.Audit_Type_ID,
                            Audit_Type = _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type1 + "-" + _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type2,
                            Before_Picture = x.Before_Picture,
                            Finished_Date = x.Finished_Date,
                            ERCS = x.ERCS,
                            Implement_Time = x.Implement_Time,
                            Implement_User = x.Implement_User,
                            Issue_EN = x.Issue_EN,
                            Issue_LL = x.Issue_LL,
                            Issue_ZW = x.Issue_ZW,
                            Building = y.Building,
                            PDC = y.PDC,
                            Line = y.Line,
                            ME_PIC = x.ME_PIC,
                            Model_Name = y.Model_Name,
                            Model_No = y.Model_No,
                            Chief = y.Chief,
                            Recorder = y.Recorder,
                            Attendees = y.Attendees,
                            PD_PIC = x.PD_PIC,
                            PD_RESP = x.PD_RESP,
                            Remark = x.Remark,
                            Status = x.Status,
                            Item_no = x.Item_no,
                            Updated_By = x.Updated_By,
                            Updated_Time = y.Updated_Time
                        });
            return await PagedList<AuditRecDto>.CreateAsync(listAuditRecDto, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<AuditRecDto>> SearchByModel(PaginationParams param, AuditRecSearch model)
        {
            var listAuditRecM = _repoAuditRecM.FindAll();
            var listAuditRecD =  _repoAuditRecD.FindAll(); 
            var listAuditRecDto = listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new AuditRecDto
                        {
                            Record_ID = x.Record_ID,
                            Record_Time = y.Record_Time,
                            After_Picture = x.After_Picture,
                            Audit_Item = x.Audit_Item,
                            Audit_Type_ID = x.Audit_Type_ID,
                            Audit_Type = _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type1 + "-" + _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type2,
                            Before_Picture = x.Before_Picture,
                            Finished_Date = x.Finished_Date,
                            ERCS = x.ERCS,
                            Implement_Time = x.Implement_Time,
                            Implement_User = x.Implement_User,
                            Issue_EN = x.Issue_EN,
                            Issue_LL = x.Issue_LL,
                            Issue_ZW = x.Issue_ZW,
                            PDC = y.PDC,
                            Line = y.Line,
                            Building = y.Building,
                            ME_PIC = x.ME_PIC,
                            Model_Name = y.Model_Name,
                            Model_No = y.Model_No,
                            Chief = y.Chief,
                            Recorder = y.Recorder,
                            Attendees = y.Attendees,
                            PD_PIC = x.PD_PIC,
                            PD_RESP = x.PD_RESP,
                            Remark = x.Remark,
                            Status = x.Status,
                            Item_no = x.Item_no,
                            Updated_By = x.Updated_By,
                            Updated_Time = x.Updated_Time
                        });
            listAuditRecDto = listAuditRecDto.Where(x =>    x.Status.Trim() == model.Status.Trim() && 
                                                            x.Building.Trim() == model.Building.Trim() &&
                                                            x.Line.Trim() == model.Line.Trim() &&
                                                            x.PDC.Trim() == model.PDC.Trim() && 
                                                            x.Record_Time >= Convert.ToDateTime(model.From_Date + " 00:00") &&
                                                            x.Record_Time <= Convert.ToDateTime(model.To_Date + " 00:00"));
            if(model.Model_No != "all") {
                listAuditRecDto = listAuditRecDto.Where(x => x.Model_No.Trim() == model.Model_No.Trim());
            }
            if(model.Model_Name != "" && model.Model_Name != string.Empty && model.Model_Name != null) {
                listAuditRecDto = listAuditRecDto.Where(x => x.Model_Name.Contains(model.Model_Name));
            }
            if(model.Audit_Type_1 != "all") {
                var auditTypeMFind = await _repoAuditTypeM.FindAll().Where(x => x.Audit_Type1.Trim() == model.Audit_Type_1 &&
                                                        x.Audit_Type2.Trim() == model.Audit_Type_2).FirstOrDefaultAsync();
                listAuditRecDto = listAuditRecDto.Where(x => x.Audit_Type_ID.Trim() == auditTypeMFind.Audit_Type_ID);
            }
            return await PagedList<AuditRecDto>.CreateAsync(listAuditRecDto, param.PageNumber, param.PageSize);
        }

        public Task<bool> Update(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }
        public async Task<List<string>> GetAllStatus()
        {
            return await _repoAuditRecD.FindAll().GroupBy(x => x.Status).Select(x => x.Key).ToListAsync();
        }

        public AuditRecDDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRecDDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRecDDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<AuditRecDto>> GetAllExcel()
        {
            var listAuditRecM = _repoAuditRecM.FindAll();
            var listAuditRecD = _repoAuditRecD.FindAll();
                    var listAuditRecDto = await listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new AuditRecDto
                        {
                            Record_ID = x.Record_ID,
                            Record_Time = y.Record_Time,
                            After_Picture = x.After_Picture,
                            Audit_Item = x.Audit_Item,
                            Audit_Type_ID = x.Audit_Type_ID,
                            Audit_Type = _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type1 + "-" + _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type2,
                            Before_Picture = x.Before_Picture,
                            Finished_Date = x.Finished_Date,
                            ERCS = x.ERCS,
                            Implement_Time = x.Implement_Time,
                            Implement_User = x.Implement_User,
                            Issue_EN = x.Issue_EN,
                            Issue_LL = x.Issue_LL,
                            Issue_ZW = x.Issue_ZW,
                            Building = y.Building,
                            PDC = y.PDC,
                            Line = y.Line,
                            ME_PIC = x.ME_PIC,
                            Model_Name = y.Model_Name,
                            Model_No = y.Model_No,
                            Chief = y.Chief,
                            Recorder = y.Recorder,
                            Attendees = y.Attendees,
                            PD_PIC = x.PD_PIC,
                            PD_RESP = x.PD_RESP,
                            Remark = x.Remark,
                            Status = x.Status,
                            Item_no = x.Item_no,
                            Updated_By = x.Updated_By,
                            Updated_Time = x.Updated_Time
                        }).ToListAsync();
            return listAuditRecDto;
        }

        public async Task<List<AuditRecDto>> SearchExcel(AuditRecSearch model)
        {
            var listAuditRecM = _repoAuditRecM.FindAll();
            var listAuditRecD =  _repoAuditRecD.FindAll(); 
            var listAuditRecDto = await listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new AuditRecDto
                        {
                            Record_ID = x.Record_ID,
                            Record_Time = y.Record_Time,
                            After_Picture = x.After_Picture,
                            Audit_Item = x.Audit_Item,
                            Audit_Type_ID = x.Audit_Type_ID,
                            Audit_Type = _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type1 + "-" + _repoAuditTypeM.FindById(x.Audit_Type_ID).Audit_Type2,
                            Before_Picture = x.Before_Picture,
                            Finished_Date = x.Finished_Date,
                            ERCS = x.ERCS,
                            Implement_Time = x.Implement_Time,
                            Implement_User = x.Implement_User,
                            Issue_EN = x.Issue_EN,
                            Issue_LL = x.Issue_LL,
                            Issue_ZW = x.Issue_ZW,
                            PDC = y.PDC,
                            Line = y.Line,
                            Building = y.Building,
                            ME_PIC = x.ME_PIC,
                            Model_Name = y.Model_Name,
                            Model_No = y.Model_No,
                            Chief = y.Chief,
                            Recorder = y.Recorder,
                            Attendees = y.Attendees,
                            PD_PIC = x.PD_PIC,
                            PD_RESP = x.PD_RESP,
                            Remark = x.Remark,
                            Status = x.Status,
                            Item_no = x.Item_no,
                            Updated_By = x.Updated_By,
                            Updated_Time = x.Updated_Time
                        }).ToListAsync();
            listAuditRecDto = listAuditRecDto.Where(x =>    x.Status.Trim() == model.Status.Trim() && 
                                                            x.Building.Trim() == model.Building.Trim() &&
                                                            x.Line.Trim() == model.Line.Trim() &&
                                                            x.PDC.Trim() == model.PDC.Trim() && 
                                                            x.Record_Time >= Convert.ToDateTime(model.From_Date + " 00:00") &&
                                                            x.Record_Time <= Convert.ToDateTime(model.To_Date + " 00:00")).ToList();
            if(model.Model_No != "all") {
                listAuditRecDto =  listAuditRecDto.Where(x => x.Model_No.Trim() == model.Model_No.Trim()).ToList();
            }
            if(model.Model_Name != "" && model.Model_Name != string.Empty && model.Model_Name != null) {
                listAuditRecDto = listAuditRecDto.Where(x => x.Model_Name.Contains(model.Model_Name)).ToList();
            }
            if(model.Audit_Type_1 != "all") {
                var auditTypeMFind = await _repoAuditTypeM.FindAll().Where(x => x.Audit_Type1.Trim() == model.Audit_Type_1 &&
                                                        x.Audit_Type2.Trim() == model.Audit_Type_2).FirstOrDefaultAsync();
                listAuditRecDto = listAuditRecDto.Where(x => x.Audit_Type_ID.Trim() == auditTypeMFind.Audit_Type_ID).ToList();
            }
            return listAuditRecDto;
        }

        public async Task<bool> AddRecD(AuditRecDViewModel model)
        {
            MES_Audit_Rec_D auditRecDConvert = _mapper.Map<MES_Audit_Rec_D>(model);
            _repoAuditRecD.Add(auditRecDConvert);
            return await _repoAuditRecD.SaveAll();
        }
    }
}