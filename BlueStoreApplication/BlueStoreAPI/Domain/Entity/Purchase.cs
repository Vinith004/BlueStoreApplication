using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Purchase
    {
        [Key]
        public int PurchaseId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UserName { get; set; }
        public int Qty { get; set; }
        public string PaymentType { get; set; }
        public string PurchaseType { get; set; }
        public string DeliveryAddress { get; set; }
        public string TotalPrice { get; set; }


    }
}
