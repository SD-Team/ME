using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API.Helpers;
using ME_API._Services.Interface;
using ME_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditTypeController : ControllerBase
    {
        private readonly IAuditTypeService _auditTypeService;
        public AuditTypeController(IAuditTypeService auditTypeService)
        {
            _auditTypeService = auditTypeService;
        }

        [HttpGet("all", Name = "GetAllAuditType")]
        public async Task<IActionResult> GetAll()
        {
            var auditTypes = await _auditTypeService.GetAllAsync();
            return Ok(auditTypes);
        }

        [HttpGet("allAuditType1", Name = "GetAllAuditType1")]
        public async Task<IActionResult> GetAllAuditType1() {
            var data = await _auditTypeService.GetAllAuditType1();
            return Ok(data);
        }
        
        [HttpPost("searchaudit")]
        public async Task<IActionResult> GetAuditsByAuditType(AuditType1FormDto formdata)
        {
            var auditType = await _auditTypeService.GetAuditsByAuditType(formdata);
            return Ok(auditType);
        }

        [HttpGet("auditTypeVersion")]
        public async Task<IActionResult> GetAuditType_1_2_Vesion() {
            var data = await _auditTypeService.GetAuditType_1_2_Vesion();
            return Ok(data);
        }
        [HttpGet(Name = "GetAuditTypes")]
        public async Task<IActionResult> GetAuditTypes([FromQuery]PaginationParams param)
        {
            var auditTypes = await _auditTypeService.GetWithPaginations(param);
            Response.AddPagination(auditTypes.CurrentPage, auditTypes.PageSize, auditTypes.TotalCount, auditTypes.TotalPages);
            return Ok(auditTypes);
        }

        [HttpGet("search/{text}", Name = "SearchAuditType")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var lists = await _auditTypeService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AuditTypeDto auditTypeDto)
        {
            if (await _auditTypeService.CheckAuditTypeExists(auditTypeDto.Audit_Type_ID))
                return BadRequest("AuditType ID already exists!");
            var username = User.FindFirst(ClaimTypes.Name).Value;
            auditTypeDto.Updated_By = username;
            if (await _auditTypeService.Add(auditTypeDto))
            {
                return CreatedAtRoute("GetAuditTypes", new { });
            }

            throw new Exception("Creating the AuditType failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(AuditTypeDto auditTypeDto)
        {
            if (await _auditTypeService.Update(auditTypeDto))
                return NoContent();
            return BadRequest($"Updating AuditType {auditTypeDto.Audit_Type_ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _auditTypeService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the AuditType");
        }

        [HttpGet("audittype2")]
        public async Task<IActionResult> GetAllAuditType2() {
            var data = await _auditTypeService.GetAllAuditType2();
            return Ok(data);
        }
    }
}