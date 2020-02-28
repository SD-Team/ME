using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Services.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditTypeDController : ControllerBase
    {
        private readonly IAuditTypeDService _auditTypeDService;
        public AuditTypeDController(IAuditTypeDService auditTypeDService) {
            _auditTypeDService = auditTypeDService;
        }

        
        [HttpGet(Name = "GetAuditTypeDs")]
        public async Task<IActionResult> GetAuditTypes([FromQuery]PaginationParams param)
        {
            var auditTypes = await _auditTypeDService.GetWithPaginations(param);
            Response.AddPagination(auditTypes.CurrentPage, auditTypes.PageSize, auditTypes.TotalCount, auditTypes.TotalPages);
            return Ok(auditTypes);
        }

        [HttpGet("search/{text}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var lists = await _auditTypeDService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet("search/{audit_Type1}/{audit_Type2}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string audit_Type1, string audit_Type2)
        {
            var lists = await _auditTypeDService.SearchByAuditType(param, audit_Type1, audit_Type2);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AuditType_D_Dto auditTypeDto)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            auditTypeDto.Updated_By = username;
            if (await _auditTypeDService.Add(auditTypeDto))
            {
                return CreatedAtRoute("GetAuditTypeDs", new { });
            }

            throw new Exception("Creating the AuditType failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (await _auditTypeDService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the AuditType");
        }

        [HttpPut]
        public async Task<IActionResult> Update(AuditType_D_Dto auditTypeDto)
        {
            if (await _auditTypeDService.Update(auditTypeDto))
                return NoContent();
            return BadRequest($"Updating AuditType {auditTypeDto.Audit_Type_ID} failed on save");
        }
    }
}