using System.Threading.Tasks;
using ME_API._Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MesOrgController : ControllerBase
    {
        private readonly IMesOrgService _service;
        public MesOrgController(IMesOrgService service) {
            _service = service;
        }

        [HttpGet("all", Name = "GetAll")]
        public async Task<IActionResult> GetAll() {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("allPdc")]
        public async Task<IActionResult> GetAllPdc() {
            var data = await _service.GetAllPDC();
            return Ok(data);
        }
        [HttpGet("allBuilding")]
        public async Task<IActionResult> GetAllBuilding() {
            var data = await _service.GetAllBuilding();
            return Ok(data);
        }
        [HttpGet("allLineID")]
        public async Task<IActionResult> GetLineID() {
            var data = await _service.GetAllLineID();
            return Ok(data);
        }
    }
}