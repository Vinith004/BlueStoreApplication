using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore.Repository
{
    public class UnitOfWork:IUnitOfWork
    {
        public UnitOfWork(IProductRepository productRepository, ILoginRepository loginRepository, IShoppingCartRepository shoppingCartRepository, IPurchaseRepository purchaseRepository)
        {
            ProductRepository = productRepository;
            LoginRepository = loginRepository;
            ShoppingCartRepository = shoppingCartRepository;
            PurchaseRepository = purchaseRepository;
        }

        public IProductRepository ProductRepository { get; set; }
        public ILoginRepository LoginRepository { get; set; }

        public IShoppingCartRepository ShoppingCartRepository { get; set; }

        public IPurchaseRepository PurchaseRepository { get; set; }
    }
}
