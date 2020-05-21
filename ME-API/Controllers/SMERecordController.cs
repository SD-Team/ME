using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SMERecordController : ControllerBase
    {
        private readonly IAuditRateService _auditRateService;

        private ISMERecordService _sMERecordService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SMERecordController(ISMERecordService sMERecordService, IWebHostEnvironment webHostEnvironment, IAuditRateService auditRateService)
        {
            _auditRateService = auditRateService;
            _sMERecordService = sMERecordService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("sme-list")]
        public async Task<IActionResult> GetListSMEScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam)
        {
            var data = await _sMERecordService.GetLisSMEScoreRecord(paginationParams, sixsScoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }

        [HttpPost("ExportExcelSME")]
        public async Task<ActionResult> ExportExcelSMERecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam)
        {
            var data = await _sMERecordService.GetLisSMEScoreRecord(paginationParams, sixsScoreRecordParam, false);

            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources\\Template\\SME_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);

            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            // designer.Workbook.Save (path + "Test.xlsx", SaveFormat.Xlsx);

            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "SME_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }
        [HttpGet("ExportExcelScoreRecordDetail")]
        public async Task<ActionResult> ExportExcelScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecordDetail(recordId);

            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources\\Template\\SME_Score_Record_Detail_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);

            Worksheet ws = designer.Workbook.Worksheets[0];
            // Gán giá trị tĩnh
            ws.Cells["B2"].PutValue(data.auditRateM.Record_Date);
            ws.Cells["D2"].PutValue(data.auditRateM.PDC);
            ws.Cells["F2"].PutValue(data.auditRateM.Building);
            ws.Cells["B3"].PutValue(data.auditRateM.Updated_By);
            ws.Cells["D3"].PutValue(data.auditRateM.Updated_Time);
            ws.Cells["F3"].PutValue(data.auditRateM.Line);
            ws.Cells["F4"].PutValue(data.auditRateM.Audit_Type2);

            designer.SetDataSource("result", data.listAuditRateD);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "SME_Score_Record_Detail" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

    }
}