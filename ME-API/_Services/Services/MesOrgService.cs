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
    public class MesOrgService : IMesOrgService
    {
        private readonly IMesOrgRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public MesOrgService(   IMesOrgRepository repo,
                                IMapper mapper,
                                MapperConfiguration configMapper) {
            _repo = repo;
            _mapper = mapper;
            _configMapper = configMapper;
        }
        public async Task<bool> Add(MesOrgDto model)
        {
            var mesOrg = _mapper.Map<MES_Org>(model);
            _repo.Add(mesOrg);
            return await _repo.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var mesOrgDto = _repo.FindById(id);
            _repo.Remove(mesOrgDto);
            return await _repo.SaveAll();
        }

        public async Task<List<MesOrgDto>> GetAllAsync()
        {
            var lists = await _repo.FindAll().ProjectTo<MesOrgDto>(_configMapper).ToListAsync();
            return lists;
        }

        public async Task<List<string>> GetAllBuilding()
        {
            return await _repo.FindAll().GroupBy(x => x.Building).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllLineID()
        {
            return await _repo.FindAll().GroupBy(x => x.Line_ID).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllPDC()
        {
            return await _repo.FindAll().GroupBy(x => x.PDC_ID).Select(x => x.Key).ToListAsync();
        }

        public MesOrgDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<MesOrgDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<MesOrgDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(MesOrgDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}