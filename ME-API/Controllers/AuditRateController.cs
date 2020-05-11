using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers {
    // [Authorize]
    [ApiController]
    [Route ("api/[controller]")]
    public class AuditRateController : ControllerBase {
        private readonly IAuditRateMService _auditRateMService;
        private readonly IAuditRateDService _auditRateDService;
        private readonly IAuditRateService _auditRateService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AuditRateController (IAuditRateDService auditRateDService, IAuditRateMService auditRateMService, IAuditRateService auditRateService, IWebHostEnvironment webHostEnvironment) {
            _auditRateService = auditRateService;
            _auditRateDService = auditRateDService;
            _auditRateMService = auditRateMService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet ("buildings")]
        public async Task<IActionResult> GetAllBuilding () {
            var data = await _auditRateMService.GetAllBuilding ();
            return Ok (data);
        }

        [HttpGet ("lines")]
        public async Task<IActionResult> GetAllLine () {
            var data = await _auditRateMService.GetAllLine ();
            return Ok (data);
        }

        [HttpGet ("pdcs")]
        public async Task<IActionResult> GetAllPDC () {
            var data = await _auditRateMService.GetAllPDC ();
            return Ok (data);
        }

        [HttpGet ("audittype2by6s")]
        public async Task<IActionResult> GetAllAuditType2By6s () {
            var data = await _auditRateMService.GetAllAuditType2By6s ();
            return Ok (data);
        }

        [HttpGet ("audittype2bysme")]
        public async Task<IActionResult> GetAllAuditType2BySME () {
            var data = await _auditRateMService.GetAllAuditType2BySME ();
            return Ok (data);
        }

        [HttpGet ("{audityType}")]
        public async Task<ActionResult> GetListQuesRecord (string audityType) {
            var data = await _auditRateService.GetListQuesScoreRecord (audityType);
            return Ok (data);

        }

    }
}