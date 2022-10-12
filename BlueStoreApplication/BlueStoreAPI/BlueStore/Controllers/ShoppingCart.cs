using Domain.Entity;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlueStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ShoppingCartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public IActionResult AddCart(ShoppingCart SC)
        {
            var data = _unitOfWork.ShoppingCartRepository.addCart(SC);
            return Ok(data);
        }
        [HttpPost]
        [Route("Cart/{UserId}")]
        public IActionResult GetCart(int UserId)
        {
            var data = _unitOfWork.ShoppingCartRepository.GetCart(UserId);
            return Ok(data);
        }
        [HttpDelete]
        [Route("{Sid}")]
        public IActionResult RemoveCart(int Sid)
        {
            var data = _unitOfWork.ShoppingCartRepository.DeleteCart(Sid);
            return Ok(data);
        }

    }

}
