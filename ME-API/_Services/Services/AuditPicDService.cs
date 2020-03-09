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

namespace ME_API._Services.Services
{
    public class AuditPicDService : IAuditPicDService
    {
        private readonly IAuditPicDRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditPicDService(IAuditPicDRepository repo,
                                IMapper mapper,
                                MapperConfiguration configMapper
                                ) {
            _repo = repo;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public async Task<bool> Add(AuditPicDDto model)
        {
            var auditPicD = _mapper.Map<MES_Audit_PIC_D>(model);
            _repo.Add(auditPicD);
            return await _repo.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repo.FindById(id);
            _repo.Remove(model);
            return await _repo.SaveAll();
        }

        public async Task<List<AuditPicDDto>> GetAllAsync()
        {
            var lists = await _repo.FindAll().ProjectTo<AuditPicDDto>(_configMapper)
                        .OrderByDescending(x => x.Updated_Time).ToListAsync();
                        return lists;
        }

        public async Task<List<string>> GetAllMePic()
        {
            var data = await _repo.FindAll().Where(x => x.PIC_Type_ID == "1")
                        .GroupBy(x => x.Resp_ID).Select(x => x.Key).ToListAsync();
            return data;
        }
        public async Task<List<string>> GetAllPdPic()
        {
            var data = await _repo.FindAll().Where(x => x.PIC_Type_ID == "2")
                        .GroupBy(x => x.Resp_ID).Select(x => x.Key).ToListAsync();
            return data;
        }

        public AuditPicDDto GetById(object id)
        {
            var auditFind =  _repo.FindById(id);
            var model =  _mapper.Map<MES_Audit_PIC_D, AuditPicDDto>(auditFind); 
            return model;
        }

        public async Task<PagedList<AuditPicDDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repo.FindAll().ProjectTo<AuditPicDDto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicDDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<AuditPicDDto>> Search(PaginationParams param, object text)
        {
            var lists = _repo.FindAll().ProjectTo<AuditPicDDto>(_configMapper)
            .Where(x => x.PIC_Type_ID.Contains(text.ToString()) || 
                        x.Resp_ID.Contains(text.ToString())     ||
                        x.Resp_ZW.Contains(text.ToString())     ||
                        x.Resp_EN.Contains(text.ToString())     ||
                        x.Resp_LL.Contains(text.ToString())     ||
                        x.Updated_By.Contains(text.ToString()))
            .OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicDDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Update(AuditPicDDto model)
        {
            var audit = _mapper.Map<MES_Audit_PIC_D>(model);
            _repo.Update(audit);
            return await _repo.SaveAll();
        }
    }
}