using System.Threading.Tasks;
using ME_API._Repositories.Interface;
using ME_API.Data;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Repositories.Repositories
{
    public class AuditTypeDRepository : MERepository<MES_Audit_Type_D>, IAuditTypeDRepository
    {
        private readonly DataContext _context;
        public AuditTypeDRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}