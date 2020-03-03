using System.Threading.Tasks;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditRecDController : ControllerBase
    {
        private readonly IAuditRecDService _service;
        public AuditRecDController(IAuditRecDService service) {
            _service = service;
        }

        [HttpGet(Name = "GetAllRecDs")]
        public async Task<IActionResult> GetAll([FromQuery]PaginationParams param){
            var auditRecs = await _service.GetAllAuditRecViewModel(param);
            Response.AddPagination(auditRecs.CurrentPage, auditRecs.PageSize, auditRecs.TotalCount, auditRecs.TotalPages);
            return Ok(auditRecs);
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetAllStatus() {
            var data = await _service.GetAllStatus();
            return Ok(data);
        }
    }
}