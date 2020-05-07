using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interface;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;

namespace ME_API._Services.Services
{
    public class AuditRateDService : IAuditRateDService
    {
        private readonly IAuditRateDRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditRateDService(IAuditRateDRepository repo,
                                 IMapper mapper,
                                 MapperConfiguration configMapper)
        {
            _repo = repo;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public async Task<bool> Add(AuditRateDDto model)
        {
            var auditRateD = _mapper.Map<MES_Audit_Rate_D>(model);
            _repo.Add(auditRateD);
            return await _repo.SaveAll();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuditRateDDto>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public AuditRateDDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRateDDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRateDDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(AuditRateDDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}