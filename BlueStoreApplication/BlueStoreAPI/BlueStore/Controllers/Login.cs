using Domain.Entity;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlueStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public LoginController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public IActionResult AddUsers(UserDetail UD)
        {
            var data = _unitOfWork.LoginRepository.Register(UD);
            return Ok(data);
        }
        [HttpPost]
        [Route("UserLogin")]
        public IActionResult UserCheck(UserDetail UD)
        {
            var data = _unitOfWork.LoginRepository.LoginCheck(UD.UserName, UD.Password);
            return Ok(data);
        }
    }
}
