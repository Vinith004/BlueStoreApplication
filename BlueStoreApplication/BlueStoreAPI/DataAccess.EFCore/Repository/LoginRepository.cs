using Domain.Entity;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.EFCore.Repository
{
    public class LoginRepository : ILoginRepository
    {
        protected DataContext DataContext { get; set; }
        public LoginRepository(DataContext dataContext)
        {
            DataContext = dataContext;
        }
        public object LoginCheck(string username, string password)
        {
            //Password encryption
            password = Encryption("hhsyuwpkwm276gjsk2654amlp098sg36", password);
            object message;
            List<UserDetail> Up = DataContext.UserDetail.Where
             (x => (x.UserName == username || x.Email == username) && x.Password == password).ToList();
            if (Up.Count > 0)
            {
                message = new { message = "Valid", UserRole = Up[0].Role,UserDetails= Up[0] };
            }
            else { message = new { message = "invalid", UserRole = Up }; }
            return message;
        }

        public string Register(UserDetail UD)
        {
            string message = "";
            UD.Password = Encryption("hhsyuwpkwm276gjsk2654amlp098sg36", UD.Password);
            DataContext.Add<UserDetail>(UD);
            DataContext.SaveChanges();
            message = "UserDetails Saved Successfully";

            return message;
        }

        public static string Encryption(string key,string Input)
        {
            byte[] iv = new byte[16];
            byte[] array;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key,aes.IV);
                using(MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using(StreamWriter sm = new StreamWriter(cs))
                        {
                            sm.Write(Input);
                        }
                        array = ms.ToArray();
                    }
                }
            }
            return Convert.ToBase64String(array);
        }

        public static string Decryption(string key, string ChiperText)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(ChiperText);
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                using (MemoryStream ms = new MemoryStream(buffer))
                {
                    using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader sm = new StreamReader(cs))
                        {
                            return sm.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
