using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IGenricRepository<T> where T : class
    {
        List<T> GetAll();
        T GetbyID(int id);
        string Add(T entity);
        string Update(T entity);
        string Delete(int id);
    }
}
