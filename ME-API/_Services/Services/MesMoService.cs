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
    public class MesMoService : IMesMoService
    {
        private readonly IMesMoRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public MesMoService(IMesMoRepository repo,
                            IMapper mapper,
                            MapperConfiguration configMappe) {
            _repo = repo;
            _mapper = mapper;
            _configMapper = configMappe;
        }
        public Task<bool> Add(MesMoDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<MesMoDto>> GetAllAsync()
        {
            var lists = await _repo.FindAll().ProjectTo<MesMoDto>(_configMapper).ToListAsync();
            return lists;
        }

        public async Task<List<string>> GetAllModelNo()
        {
            return await _repo.FindAll().GroupBy(x => x.Style_No).Select(x => x.Key).ToListAsync();
        }

        public MesMoDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<string> GetModelName(string modelNo)
        {
            var mesMoFind = await _repo.FindAll().Where(x => x.Style_No.Trim() == modelNo.Trim()).FirstOrDefaultAsync();
            return mesMoFind.Style_Name.ToString();
        }

        public Task<PagedList<MesMoDto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<MesMoDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(MesMoDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}