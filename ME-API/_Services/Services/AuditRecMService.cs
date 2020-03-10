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
    public class AuditRecMService : IAuditRecMService
    {
        private readonly IAuditRecMRepository _repoAuditRecM;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public AuditRecMService(IAuditRecMRepository repo,
                                IMapper mapper,
                                MapperConfiguration configMapper) { 
            _repoAuditRecM = repo;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public Task<bool> Add(AuditRecMDto model)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> AddAuditRecM(AuditRecMViewModel model)
        {
            var recored_Time = DateTime.Parse(model.Record_Time.ToString());
            AuditRecMDto data = new AuditRecMDto();
            data.Record_ID = model.Record_ID.Trim();
            data.Record_Time = recored_Time;
            data.PDC = model.PDC.Trim();
            data.Building = model.Building.Trim();
            data.Line = model.Line.Trim();
            data.Model_Name = model.Model_Name.Trim();
            data.Model_No = model.Model_No.Trim();
            data.Chief = model.Chief.Trim();
            data.Recorder = model.Recorder.Trim();
            data.Attendees = model.Attendees.Trim();
            data.Updated_By = model.Updated_By.Trim();
            var auditRecMAdd = _mapper.Map<MES_Audit_Rec_M>(data);
            _repoAuditRecM.Add(auditRecMAdd);
            return await _repoAuditRecM.SaveAll();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<AuditRecMDto>> GetAllAsync()
        {
            var lists = await _repoAuditRecM.FindAll().ProjectTo<AuditRecMDto>(_configMapper)
            .OrderByDescending(x => x.Updated_Time).ToListAsync();
            return lists;
        }

        public async Task<List<string>> GetAllBuilding()
        {
            return await _repoAuditRecM.FindAll().GroupBy(x => x.Building).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllLine()
        {
            return await _repoAuditRecM.FindAll().GroupBy(x => x.Line).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllModelName()
        {
            return await _repoAuditRecM.FindAll().GroupBy(x => x.Model_Name).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllModelNo()
        {
            return await _repoAuditRecM.FindAll().GroupBy(x => x.Model_No).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllPDC()
        {
            return await _repoAuditRecM.FindAll().GroupBy(x => x.PDC).Select(x => x.Key).ToListAsync();
        }

        public AuditRecMDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<AuditRecMDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoAuditRecM.FindAll().ProjectTo<AuditRecMDto>(_configMapper)
                                        .OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditRecMDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public Task<PagedList<AuditRecMDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(AuditRecMDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}