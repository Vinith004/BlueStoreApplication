using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore.Repository
{
    public class ProductRepository:IProductRepository
    {
        protected DataContext DataContext { get; set; }
        public ProductRepository(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public List<Product> GetAll()
        {
            List<Product> products;
            products = DataContext.Set<Product>().ToList();
            var x =  products.OrderByDescending(x=> x.ProductID).ToList();
            var xy = products.OrderBy(x => x.ProductID).ToList();
            return x;
        }

        public Product GetbyID(int id)
        {
            Product data;
            data = DataContext.Find<Product>(id);
            return data;
        }

        public string Add(Product entity)
        {
            string message = "";
       
            DataContext.Add<Product>(entity);
            DataContext.SaveChanges();
            message = "Product Saved Successfully";
           
             return message;
        }

        public string Update(Product entity)
        {
            string message = "";

            DataContext.Update<Product>(entity);
            DataContext.SaveChanges();
            message = "Product Updated Successfully";

            return message;
        }

        public string Delete(int id)
        {
            string message = "";
            Product temb = GetbyID(id);
            if(temb != null)
            {
                DataContext.Remove<Product>(temb);
                DataContext.SaveChanges();
                message = "Product Deleted successfully";
            }
            return message;
        }
        public List<Product> GetProductByType(string ProductType)
        {
            List<Product> ProductList;
            //ProductList = DataContext.Set<Product>(ProductType).ToList();
            ProductList = DataContext.ProductDetail.Where(x => x.ProductType == ProductType).ToList();
            return ProductList;
        }
    }
}
