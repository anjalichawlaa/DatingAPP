using System.ComponentModel;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http;
using System;
namespace myDatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
        }

        public static int CalcAge(this DateTime datetime)
        {
            var age=DateTime.Today.Year - datetime.Year;
            if(datetime.AddYears(age)>DateTime.Today)
                age--;
            
            return age;
        }
    }
}