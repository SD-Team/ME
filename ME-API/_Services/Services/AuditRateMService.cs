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
    public class AuditRateMService : IAuditRateMService
    {
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AuditRateMService(IAuditRateMRepository auditRateMRepository,
                                 IMapper mapper,
                                 MapperConfiguration configMapper)
        {
            _auditRateMRepository = auditRateMRepository;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public async Task<bool> Add(AuditRateMDto model)
        {
            var auditRateM = _mapper.Map<MES_Audit_Rate_M>(model);
            _auditRateMRepository.Add(auditRateM);
            return await _auditRateMRepository.SaveAll();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuditRateMDto>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<string>> GetAllAuditType2By6s()
        {
            return await _auditRateMRepository.FindAll().Where(x => x.Audit_Type1.Trim() == "6S").GroupBy(x => x.Audit_Type2).Select(x => x.Key).ToListAsync();
        }
        public async Task<List<string>> GetAllAuditType2BySME()
        {
            return await _auditRateMRepository.FindAll().Where(x => x.Audit_Type1.Trim() == "SME2.0").GroupBy(x => x.Audit_Type2).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllBuilding()
        {
            return await _auditRateMRepository.FindAll().GroupBy(x => x.Building).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllLine()
        {
            return await _auditRateMRepository.FindAll().GroupBy(x => x.Line).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllPDC()
        {
            return await _auditRateMRepository.FindAll().GroupBy(x => x.PDC).Select(x => x.Key).ToListAsync();
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