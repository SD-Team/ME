using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class WaterSpiderRecordController : ControllerBase
    {
        private IWaterSpiderRecordService _waterSpiderRecordService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public WaterSpiderRecordController (IWaterSpiderRecordService waterSpiderRecordService, IWebHostEnvironment webHostEnvironment) {
            _waterSpiderRecordService = waterSpiderRecordService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost ("waterspider-list")]
        public async Task<IActionResult> GetListWaterSpiderScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam) {
            var data = await _waterSpiderRecordService.GetLisWaterSpiderScoreRecord (paginationParams, scoreRecordParam);
            Response.AddPagination (data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok (data);
        }

        [HttpPost ("ExportExcelWaterSpider")]
        public async Task<ActionResult> ExportExcelSMERecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam) {
            var data = await _waterSpiderRecordService.GetLisWaterSpiderScoreRecord (paginationParams, scoreRecordParam, false);

            var path = Path.Combine (_webHostEnvironment.ContentRootPath, "Resources\\Template\\WaterSpider_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner ();
            designer.Workbook = new Workbook (path);

            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource ("result", data);
            designer.Process ();

            MemoryStream stream = new MemoryStream ();
            designer.Workbook.Save (stream, SaveFormat.Xlsx);

            // designer.Workbook.Save (path + "Test.xlsx", SaveFormat.Xlsx);

            byte[] result = stream.ToArray ();

            return File (result, "application/xlsx", "WaterSpider_Score_Record" + DateTime.Now.ToString ("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

    }
}