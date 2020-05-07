using System.Threading.Tasks;
using ME_API._Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditRateController : ControllerBase
    {
        private readonly IAuditRateMService _auditRateMService;
        private readonly IAuditRateDService _auditRateDService;
        public AuditRateController(IAuditRateDService auditRateDService, IAuditRateMService auditRateMService)
        {
            _auditRateDService = auditRateDService;
            _auditRateMService = auditRateMService;
        }

        [HttpGet("buildings")]
        public async Task<IActionResult> GetAllBuilding() {
            var data = await _auditRateMService.GetAllBuilding();
            return Ok(data);
        }
        [HttpGet("lines")]
        public async Task<IActionResult> GetAllLine() {
            var data = await _auditRateMService.GetAllLine();
            return Ok(data);
        }

        [HttpGet("pdcs")]
        public async Task<IActionResult> GetAllPDC() {
            var data = await _auditRateMService.GetAllPDC();
            return Ok(data);
        }

        [HttpGet("audittype2")]
        public async Task<IActionResult> GetAllAuditType2() {
            var data = await _auditRateMService.GetAllAuditType2();
            return Ok(data);
        }

        
    }
}