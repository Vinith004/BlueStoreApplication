using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; } 
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }

    }
}
