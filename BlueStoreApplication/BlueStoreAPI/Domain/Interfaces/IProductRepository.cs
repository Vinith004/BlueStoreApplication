﻿using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IProductRepository:IGenricRepository<Product>
    {
        List<Product> GetProductByType(string ProductType);
    }
}
