using System.Linq;
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
        

        public string GetAuditItemEN(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x => x.Audit_Item_ID == auditItemId && x.Audit_Type_ID == auditTypeId).FirstOrDefault().Audit_Item_EN;
        }

        public string GetAuditItemLL(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x => x.Audit_Item_ID == auditItemId && x.Audit_Type_ID == auditTypeId).FirstOrDefault().Audit_Item_LL;
        }

        public string GetAuditItemZW(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x => x.Audit_Item_ID == auditItemId && x.Audit_Type_ID == auditTypeId).FirstOrDefault().Audit_Item_ZW;
        }
    }
}