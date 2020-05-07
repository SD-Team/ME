using ME_API._Repositories.Interface;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditRateDRepository : MERepository<MES_Audit_Rate_D>, IAuditRateDRepository
    {
        public AuditRateDRepository(DataContext context) : base(context)
        {
        }
    }
}