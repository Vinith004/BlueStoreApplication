using Domain.Entity;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore.Repository
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private readonly DataContext _dataContext;
        public PurchaseRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public string purchase(Purchase entity)
        {
            string message = "";
            _dataContext.Add<Purchase>(entity);
            _dataContext.SaveChanges();
            DeleteShopCart(entity.ProductId,entity.UserId);
            message = "Your Order Successfully placed on your address";
            return message;
        }

        public void DeleteShopCart(int ProductId,int UserId)
        {
            List<ShoppingCart> sp = _dataContext.ShoppingCart.Where(X => X.ProductId == ProductId && X.UserId == UserId).ToList();
            if (sp.Count != 0)
            {
                _dataContext.Remove<ShoppingCart>(sp[0]);
                _dataContext.SaveChanges();

            }
        }
    }
}
