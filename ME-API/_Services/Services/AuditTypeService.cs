using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Services.Services
{
    public class AuditTypeService : IAuditTypeService
    {
        private readonly IAuditTypeRepository _repoAuditType;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditTypeService(IAuditTypeRepository repoAuditType, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoAuditType = repoAuditType;

        }
        public async Task<PagedList<AuditTypeDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditTypeDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Add(AuditTypeDto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_M>(model);
            _repoAuditType.Add(auditType);
            return await _repoAuditType.SaveAll();
        }

        public async Task<bool> CheckAuditTypeExists(string auditTypeId)
        {
            return await _repoAuditType.CheckAuditTypeExists(auditTypeId);
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repoAuditType.FindById(id);
            _repoAuditType.Remove(model);
            return await _repoAuditType.SaveAll();
        }

        public async Task<List<AuditTypeDto>> GetAllAsync()
        {
            return await _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper).OrderByDescending(x => x.Updated_Time).ToListAsync();
        }

        public async Task<List<AuditTypeDto>> GetAuditsByAuditType(AuditType1FormDto formdata) {
            var data = await _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper)
            .Where(x => x.Audit_Type1.Trim() == formdata.Audit_Type_1.Trim()).OrderByDescending(x => x.Updated_Time).ToListAsync();
            return data;
        }
        public AuditTypeDto GetById(object id)
        {
            return _mapper.Map<MES_Audit_Type_M, AuditTypeDto>(_repoAuditType.FindById(id));
        }

        public async Task<bool> Update(AuditTypeDto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_M>(model);
            auditType.Updated_Time = DateTime.Now;
            _repoAuditType.Update(auditType);
            return await _repoAuditType.SaveAll();
        }

        public async Task<PagedList<AuditTypeDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper)
            .Where(
                x => x.Audit_Type_ID.Contains(text.ToString()) || 
                x.Audit_Type1.Contains(text.ToString()) || 
                x.Audit_Type2.Contains(text.ToString()) || 
                x.Audit_Type2_Name.Contains(text.ToString()) ||
                x.Updated_By.Contains(text.ToString())
                )
            .OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditTypeDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<List<string>> GetAllAuditType1()
        {
            var lists = await _repoAuditType.FindAll().Select(x => x.Audit_Type1).Distinct().ToListAsync();
            return lists;
        }
    }
}