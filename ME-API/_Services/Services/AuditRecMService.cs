using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
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

        public Task<PagedList<AuditRecMDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
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