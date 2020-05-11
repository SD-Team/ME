using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Services.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class SixsRecordController : ControllerBase {
        private readonly ISixsRecordService  _iSixsRecordService;
           private readonly IWebHostEnvironment _webHostEnvironment;

        public SixsRecordController(ISixsRecordService iSixsRecordService,IWebHostEnvironment webHostEnvironment)
        {
           _iSixsRecordService = iSixsRecordService;
           _webHostEnvironment = webHostEnvironment;
        }

         [HttpPost ("sixs-list")]
        public async Task<IActionResult> GetListSixsScoreRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _iSixsRecordService.GetListSixsScoreRecord (paginationParams, sixsScoreRecordParam);
            Response.AddPagination (data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok (data);
        }

      

        [HttpPost ("ExportExcelSixs")]
        public async Task<ActionResult> ExportExcelSixsRecord ([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam) {
            var data = await _iSixsRecordService.GetListSixsScoreRecord (paginationParams, sixsScoreRecordParam, false);

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

        


    }
}