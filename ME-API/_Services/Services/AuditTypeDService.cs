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
using Microsoft.EntityFrameworkCore;
using System;
namespace ME_API._Services.Services
{
    public class AuditTypeDService : IAuditTypeDService
    {
        private readonly IAuditTypeDRepository _repoAuditDType;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditTypeDService(IAuditTypeDRepository repoAuditDType, IMapper mapper, MapperConfiguration configMapper) {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoAuditDType = repoAuditDType;
        }
        public async Task<bool> Add(AuditType_D_Dto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_D>(model);
            _repoAuditDType.Add(auditType);
            return await _repoAuditDType.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repoAuditDType.FindById(id);
            _repoAuditDType.Remove(model);
            return await _repoAuditDType.SaveAll();
        }

        public async Task<List<AuditType_D_Dto>> GetAllAsync()
        {
            return await _repoAuditDType.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper).OrderByDescending(x => x.Updated_Time).ToListAsync();
        }

        public AuditType_D_Dto GetById(object id)
        {
            return _mapper.Map<MES_Audit_Type_D, AuditType_D_Dto>(_repoAuditDType.FindById(id));
        }

        public async Task<PagedList<AuditType_D_Dto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoAuditDType.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditType_D_Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<AuditType_D_Dto>> Search(PaginationParams param, object text)
        {
            var lists = _repoAuditDType.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper)
            .Where( x => x.Audit_Type_ID.Contains(text.ToString()) || 
                    x.Audit_Item_LL.Contains(text.ToString()) ||
                    x.Audit_Item_EN.Contains(text.ToString()) ||
                    x.Audit_Item_ZW.Contains(text.ToString()))
                    .OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditType_D_Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Update(AuditType_D_Dto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_D>(model);
            auditType.Updated_Time = DateTime.Now;
            _repoAuditDType.Update(auditType);
            return await _repoAuditDType.SaveAll();
        }
    }
}