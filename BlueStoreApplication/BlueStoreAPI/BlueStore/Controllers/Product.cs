using Domain.Entity;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace BlueStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _env;
        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            _unitOfWork = unitOfWork;
            _env = env;
        }

        [HttpGet]
        public IActionResult GetProduct()
        {
            var data = _unitOfWork.ProductRepository.GetAll();
            return Ok(data);
        }
        [HttpPost]
        public IActionResult AddProducts(Product pro)
        {
            //FileMove(pro.ProductPicFileName,pro.ProductType);
            var sourseFile = _env.ContentRootPath + "/Photos/" + pro.ProductPicFileName;
            var DisFile = _env.ContentRootPath + "/Photos/" + pro.ProductType + "/" + pro.ProductPicFileName;
            if (System.IO.File.Exists(sourseFile))
            {
                System.IO.File.Move(sourseFile, DisFile);
            }         
            var data = _unitOfWork.ProductRepository.Add(pro);
            return Ok(data);
        }

        [HttpPut]
        public IActionResult UpdateProducts(Product pro)
        {
            var data = _unitOfWork.ProductRepository.Update(pro);
            return Ok(data);
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteProducts(int id)
        {
            var data = _unitOfWork.ProductRepository.Delete(id);
            return Ok(data);
        }

        [HttpGet]
        [Route("{ProductType}")]
        public IActionResult GetProductByType(string ProductType)
        {
            var data = _unitOfWork.ProductRepository.GetProductByType(ProductType);            
            return Ok(data);
        }

        [HttpPost]
        [Route("SaveFile")]
        public JsonResult SaveFile()
        {
            var HttpRequest = Request.Form;
            var PostedFile = HttpRequest.Files[0];
            string fileName = PostedFile.FileName;
            var PhyshicalPath = _env.ContentRootPath + "/Photos/" + fileName;
            using(var stream = new FileStream(PhyshicalPath, FileMode.Create))
            {
                PostedFile.CopyTo(stream);
            }
            return new JsonResult(fileName);        
        }

    }
}
