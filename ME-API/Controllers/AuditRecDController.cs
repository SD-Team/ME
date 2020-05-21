using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Services.Interface;
using ME_API.Helpers;
using ME_API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditRecDController : ControllerBase
    {
        private readonly IAuditRecDService _service;
        public AuditRecDController(IAuditRecDService service) {
            _service = service;
        }

        [HttpGet("all" ,Name = "GetAllRecDs")]
        public async Task<IActionResult> GetAll([FromQuery]PaginationParams param){
            var auditRecs = await _service.GetAllAuditRecViewModel(param);
            Response.AddPagination(auditRecs.CurrentPage, auditRecs.PageSize, auditRecs.TotalCount, auditRecs.TotalPages);
            return Ok(auditRecs);
        }

        [HttpGet("recDs" ,Name = "RecDs")]
        public async Task<IActionResult> GetRecDs([FromQuery]PaginationParams param) {
            var recDs = await _service.GetWithPaginations(param);
            Response.AddPagination(recDs.CurrentPage, recDs.PageSize, recDs.TotalCount, recDs.TotalPages);
            return Ok(recDs);
        }
        [HttpGet("allExcel",Name = "getallExcel")]
        public async Task<IActionResult> GetAllExcel() {
            var auditRecs = await _service.GetAllExcel();
            return Ok(auditRecs);
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetAllStatus() {
            var data = await _service.GetAllStatus();
            return Ok(data);
        }

        [HttpPost("searchModel")]
        public async Task<IActionResult> SearchByModel([FromQuery]PaginationParams param, [FromBody]AuditRecSearch model) {
            var auditRecs = await _service.SearchByModel(param, model);
            Response.AddPagination(auditRecs.CurrentPage, auditRecs.PageSize, auditRecs.TotalCount, auditRecs.TotalPages);
            return Ok(auditRecs);
        }

        [HttpPost("searchExcel")]
        public async Task<IActionResult> SearchExcel([FromBody]AuditRecSearch model) {
            var auditRecs = await _service.SearchExcel(model);
            return Ok(auditRecs);
        }

        [HttpPost("AddRecD")]
        public async Task<IActionResult> AddRecD([FromBody] AuditRecDViewModel model) {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            model.Updated_By = username;
            if (await _service.AddRecD(model)) {
                return CreatedAtRoute("GetAllRecDs", new { });
            }
            throw new Exception("Creating the Audit RecD failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRecD([FromBody] AuditRecDViewModel model) {
            
            if (await _service.UpdateRecD(model))
                return NoContent();
            return BadRequest($"Updating brand {model.Audit_Type_ID} failed on save");
        }
    }
}