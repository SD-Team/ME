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
    public class AuditPicDController : ControllerBase
    {
        private readonly IAuditPicDService _service;
        public AuditPicDController(IAuditPicDService service) {
            _service = service;
        }
        
        [HttpGet("all", Name = "GetAllPicD")]
        public async Task<IActionResult> GetAll() {
            var models = await _service.GetAllAsync();
            return Ok(models);
        }

        [HttpGet("search/{text}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param,string text) {
            var lists = await _service.Search(param,text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet(Name = "GetAuditPicDs")]
        public async Task<IActionResult> GetAuditPicDs([FromQuery]PaginationParams param) {
            var auditPicDs = await _service.GetWithPaginations(param);
            Response.AddPagination(auditPicDs.CurrentPage, auditPicDs.PageSize, auditPicDs.TotalCount, auditPicDs.TotalPages);
            return Ok(auditPicDs);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AuditPicDDto data) {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            data.Updated_By = username;
            if (await _service.Add(data)) {
                return CreatedAtRoute("GetAuditPicDs", new {});
            }
            throw new Exception("Creating the Audit PicD failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id) {
            if (await _service.Delete(id)) {
                return NoContent();
            }
            throw new Exception("Error deleting the Audit PicD");
        }

        [HttpPut]
        public async Task<IActionResult> Update(AuditPicDDto model) {
            if (await _service.Update(model)) {
                return NoContent();
            }
            return BadRequest($"Updating Audit PicD {model.PIC_Type_ID} failed on save");
        }
    }
}