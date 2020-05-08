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

        [HttpGet ("audittype2")]
        public async Task<IActionResult> GetAllAuditType2 () {
            var data = await _auditRateMService.GetAllAuditType2 ();
            return Ok (data);
        }

        [HttpPost ("sixs-list")]
        public async Task<IActionResult> GetListSixsScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetListSixsScoreRecord (paginationParams, sixsScoreRecordParam);
            Response.AddPagination (data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok (data);
        }

        [HttpPost ("sme-list")]
        public async Task<IActionResult> GetListSMEScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetLisSMEScoreRecord (paginationParams, sixsScoreRecordParam);
            Response.AddPagination (data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok (data);
        }

        [HttpPost ("ExportExcelSixs")]
        public async Task<ActionResult> ExportExcelSixsRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetListSixsScoreRecord (paginationParams, sixsScoreRecordParam, false);

            var path = Path.Combine (_webHostEnvironment.ContentRootPath, "Resources\\Template\\Sixs_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner ();
            designer.Workbook = new Workbook (path);

            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource ("result", data);
            designer.Process ();

            MemoryStream stream = new MemoryStream ();
            designer.Workbook.Save (stream, SaveFormat.Xlsx);

            // designer.Workbook.Save (path + "Test.xlsx", SaveFormat.Xlsx);

            byte[] result = stream.ToArray ();

            return File (result, "application/xlsx", "Sixs_Score_Record" + DateTime.Now.ToString ("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpPost ("ExportExcelSME")]
        public async Task<ActionResult> ExportExcelSMERecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _auditRateService.GetLisSMEScoreRecord (paginationParams, sixsScoreRecordParam, false);

            var path = Path.Combine (_webHostEnvironment.ContentRootPath, "Resources\\Template\\SME_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner ();
            designer.Workbook = new Workbook (path);

            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource ("result", data);
            designer.Process ();

            MemoryStream stream = new MemoryStream ();
            designer.Workbook.Save (stream, SaveFormat.Xlsx);

            // designer.Workbook.Save (path + "Test.xlsx", SaveFormat.Xlsx);

            byte[] result = stream.ToArray ();

            return File (result, "application/xlsx", "SME_Score_Record" + DateTime.Now.ToString ("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

    }
}