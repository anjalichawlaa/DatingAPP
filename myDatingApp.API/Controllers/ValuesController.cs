using System;
using System.Security.AccessControl;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using myDatingApp.API.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace myDatingApp.API.Controllers
{
     [ApiController]
    [Route("[controller]")]
    public class ValuesController: ControllerBase
    {

        private readonly DataContext _context;
        public ValuesController(DataContext Context)
        {
            _context=Context;
        }
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
           var values=await _context.Values.ToListAsync();
           return Ok(values);
        }

[HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
            var value =await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(value);

    }
    }
}