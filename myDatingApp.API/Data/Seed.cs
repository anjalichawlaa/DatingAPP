using System.Linq;
using Newtonsoft.Json;
using myDatingApp.API.Models;
using System.Collections.Generic;
namespace myDatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if(!context.Users.Any())
            {
                var userData=System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach(var user in users)
                {
                    byte[] passwordhash, passwordsalt;
                    CreatePasswordHashSalt("password",out passwordhash,out passwordsalt);
                    user.PasswordHash=passwordhash;
                    user.PasswordSalt=passwordsalt;
                    user.UserName=user.UserName.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }
        static void CreatePasswordHashSalt(string password,out byte[] passwordhash,out byte[] passwordsalt)
         {
             using(var hmac=new System.Security.Cryptography.HMACSHA512())
             {
                 passwordsalt = hmac.Key;
                passwordhash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
             }

         }
    }
}