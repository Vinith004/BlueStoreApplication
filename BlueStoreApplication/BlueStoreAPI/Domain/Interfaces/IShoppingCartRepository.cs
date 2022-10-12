using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IShoppingCartRepository
    {
        string addCart(ShoppingCart sc);
        object GetCart(int UserId);

        string DeleteCart(int Sid);
    }
}
