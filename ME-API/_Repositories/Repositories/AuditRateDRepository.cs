using System.Linq;
using ME_API._Repositories.Interface;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditRateDRepository : MERepository<MES_Audit_Rate_D>, IAuditRateDRepository
    {
        private readonly DataContext _context;
        public AuditRateDRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public int SumRating0(string recordId)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == recordId).Sum(x => x.Rating_0);
        }

        public int SumRating1(string recordId)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == recordId).Sum(x => x.Rating_1);
        }

        public int? SumRatingNa(string recordId)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == recordId).Sum(x => x.Rate_NA);
        }
    }
}