using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        private readonly IAuditRateService _auditRateService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AuditRateController(IAuditRateDService auditRateDService, IAuditRateMService auditRateMService, IAuditRateService auditRateService, IWebHostEnvironment webHostEnvironment)
        {
            _auditRateService = auditRateService;
            _auditRateDService = auditRateDService;
            _auditRateMService = auditRateMService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("buildings")]
        public async Task<IActionResult> GetAllBuilding()
        {
            var data = await _auditRateMService.GetAllBuilding();
            return Ok(data);
        }

        [HttpGet("lines")]
        public async Task<IActionResult> GetAllLine()
        {
            var data = await _auditRateMService.GetAllLine();
            return Ok(data);
        }

        [HttpGet("pdcs")]
        public async Task<IActionResult> GetAllPDC()
        {
            var data = await _auditRateMService.GetAllPDC();
            return Ok(data);
        }

        [HttpGet("audittype2by6s")]
        public async Task<IActionResult> GetAllAuditType2By6s()
        {
            var data = await _auditRateMService.GetAllAuditType2By6s();
            return Ok(data);
        }

        [HttpGet("audittype2bysme")]
        public async Task<IActionResult> GetAllAuditType2BySME()
        {
            var data = await _auditRateMService.GetAllAuditType2BySME();
            return Ok(data);
        }

        [HttpGet("getlistquesrecord")]
        public async Task<ActionResult> GetListQuesRecord(string auditType2, string auditType1)
        {
            var data = await _auditRateService.GetListQuesScoreRecord(auditType2, auditType1);
            return Ok(data);

        }

        [HttpPost("save")]
        public async Task<ActionResult> SaveScopeRecordRate(ScoreRecordAnsDto param)
        {
            if (await _auditRateService.SaveScopeRecord(param))
            {
                return NoContent();
            };
            throw new Exception("Error ");
        }

        [HttpGet("detail/{recordId}")]
        public async Task<ActionResult> GetScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecordDetail(recordId);
            if (data != null)
            {
                return Ok(data);
            }
            return NoContent();
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadPicture(IFormFile file, string recordId, string auditItemId)
        {
            recordId = Request.Form["recordId"];
            auditItemId = Request.Form["auditItemId"];
            if (file != null)
            {
                var filename = ContentDispositionHeaderValue
                                   .Parse(file.ContentDisposition)
                                   .FileName
                                   .Trim('"');
                var uploadPicture = "AuditRateDRemark_" + recordId + "_" + auditItemId + Path.GetExtension(filename);

                string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\images";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                string filePath = Path.Combine(folder, uploadPicture);

                // kiểm tra file cũ có chưa xóa đi
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                if (await _auditRateDService.UpdateUploadPicture(recordId, auditItemId, uploadPicture))
                {
                    return NoContent();
                }
                throw new Exception("Error ");
            }
            return NoContent();
        }


        [HttpGet("getmepic")]
        public async Task<ActionResult> GetMEPIC()
        {
            var data = await _auditRateService.GetMEPIC();
            if (data != null)
            {
                return Ok(data);
            }
            return NoContent();
        }

        [HttpGet("getpdresp")]
        public async Task<ActionResult> GetPDRESP()
        {
            var data = await _auditRateService.GetPDRESP();
            if (data != null)
            {
                return Ok(data);
            }
            return NoContent();
        }
    }
}