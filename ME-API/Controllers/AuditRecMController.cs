using System.Threading.Tasks;
using ME_API._Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditRecMController : ControllerBase
    {
        private readonly IAuditRecMService _service;
        public AuditRecMController(IAuditRecMService service) {
            _service = service;
        }

        [HttpGet("all", Name = "GetAllRecM")]
        public async Task<IActionResult> GetAll(){
            var data = await _service.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("buildings")]
        public async Task<IActionResult> GetAllBuilding() {
            var data = await _service.GetAllBuilding();
            return Ok(data);
        }
        [HttpGet("lines")]
        public async Task<IActionResult> GetAllLine() {
            var data = await _service.GetAllLine();
            return Ok(data);
        }
        [HttpGet("modelNames")]
        public async Task<IActionResult> GetAllModelName() {
            var data = await _service.GetAllModelName();
            return Ok(data);
        }
        [HttpGet("modelNos")]
        public async Task<IActionResult> GetAllModelNo() {
            var data = await _service.GetAllModelNo();
            return Ok(data);
        }
        [HttpGet("pdcs")]
        public async Task<IActionResult> GetAllPDC() {
            var data = await _service.GetAllPDC();
            return Ok(data);
        }
    }
}