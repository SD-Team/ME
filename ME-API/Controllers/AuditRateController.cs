using System.Threading.Tasks;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers {
    // [Authorize]
    [ApiController]
    [Route ("api/[controller]")]
    public class AuditRateController : ControllerBase {
        private readonly IAuditRateMService _auditRateMService;
        private readonly IAuditRateDService _auditRateDService;
        private readonly IAuditRateService _auditRateService;
        public AuditRateController (IAuditRateDService auditRateDService, IAuditRateMService auditRateMService, IAuditRateService auditRateService) {
            _auditRateService = auditRateService;
            _auditRateDService = auditRateDService;
            _auditRateMService = auditRateMService;
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

        [HttpGet ("audittype2")]
        public async Task<IActionResult> GetAllAuditType2 () {
            var data = await _auditRateMService.GetAllAuditType2 ();
            return Ok (data);
        }

        [HttpPost ("sixs-list")]
        public async Task<IActionResult> GetListSixsScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetListSixsScoreRecord (paginationParams, sixsScoreRecordParam);
            return Ok (data);
        }

        [HttpPost ("sme-list")]
        public async Task<IActionResult> GetListSMEScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetLisSMEScoreRecord (paginationParams, sixsScoreRecordParam);
            return Ok (data);
        }

    }
}