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
    public class AuditRateMService : IAuditRateMService
    {
        private readonly IAuditRateMRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditRateMService(IAuditRateMRepository repo,
                                 IMapper mapper,
                                 MapperConfiguration configMapper)
        {
            _repo = repo;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public async Task<bool> Add(AuditRateMDto model)
        {
            var auditRateM = _mapper.Map<MES_Audit_Rate_M>(model);
            _repo.Add(auditRateM);
            return await _repo.SaveAll();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuditRateMDto>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public AuditRateMDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRateMDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRateMDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(AuditRateMDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}