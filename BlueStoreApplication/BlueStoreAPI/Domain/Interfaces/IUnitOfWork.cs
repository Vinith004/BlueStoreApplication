using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        IProductRepository ProductRepository { get; }
        ILoginRepository LoginRepository { get; }
        IShoppingCartRepository ShoppingCartRepository { get; }
        IPurchaseRepository PurchaseRepository { get; }
    }
}
