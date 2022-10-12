using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Product> ProductDetail { get; set; }
        public DbSet<UserDetail> UserDetail { get; set; }

        public DbSet<ShoppingCart> ShoppingCart { get; set; }

        public DbSet<Purchase> PurchaseDetails { get; set; }
    }
}
