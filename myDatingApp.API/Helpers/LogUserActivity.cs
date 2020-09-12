using System;
using System.Security.Claims;

using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using myDatingApp.API.Data;

namespace myDatingApp.API.Helpers
{
    public class LogUserActivity:IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context,ActionExecutionDelegate next)
        {
            var result = await next();

            var userId = int.Parse(result.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo= result.HttpContext.RequestServices.GetService<IDatingRepository>();

            var user=repo.GetUser(userId);
            user.Result.LastActive=DateTime.Now;
            await repo.SaveAll();
        }
    }
}