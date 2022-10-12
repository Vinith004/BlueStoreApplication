using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore.Repository
{
    public class ShoppingCartRepository: IShoppingCartRepository
    {
        protected DataContext DataContext { get; set; }
        public ShoppingCartRepository(DataContext dataContext)
        {
            DataContext = dataContext;
        }

        public string addCart(ShoppingCart sc)
        {
            string message;
            List<ShoppingCart> sp = DataContext.ShoppingCart.Where(X=>X.ProductId == sc.ProductId && X.UserId == sc.UserId).ToList();
            if (sp.Count == 0)
            {               
                DataContext.Add<ShoppingCart>(sc);
                DataContext.SaveChanges();
                
            }
            message = "Product Saved to your cart Successfully";
            return message;
        }
        public object GetCart(int UserId)
        {
            var categorizedProducts = DataContext.UserDetail
                    .Join(DataContext.ShoppingCart, U => U.Id, SC => SC.UserId, (U, SC) => new { U, SC })
                     .Join(DataContext.ProductDetail, ppc => ppc.SC.ProductId, PD => PD.ProductID, (ppc, PD) => new { ppc, PD })
                    .Select(m => new
                    {
                        UserId = m.ppc.U.Id, // or m.ppc.pc.ProdId
                        UserName = m.ppc.U.UserName,
                        ShoppingId = m.ppc.SC.ShoppingCartId,
                        ProductID = m.PD.ProductID,
                        ProductName = m.PD.ProductName,
                        Price = m.PD.Price,
                        ProductType = m.PD.ProductType,
                        ProductFileName = m.PD.ProductPicFileName,
                        Qty = 1

                        // other assignments
                    }).Distinct() ;
            object Carts;
            Carts= categorizedProducts.Where(p=> p.UserId == UserId);   
            //DataContext.Add<ShoppingCart>(UserId);
            //DataContext.SaveChanges();
            //message = "Product Saved to your cart Successfully";

            return Carts;
        }

       public string DeleteCart(int Sid)
        {
            string message = "";
            ShoppingCart data;
            data = DataContext.Find<ShoppingCart>(Sid);
            if(data != null)
            {
                DataContext.Remove<ShoppingCart>(data);
                DataContext.SaveChanges();
                message = "Cart Deleted successfully";
            }
           
            return message;
        }
    }
}
