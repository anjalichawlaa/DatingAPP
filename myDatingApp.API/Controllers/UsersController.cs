using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using myDatingApp.API.Data;
using myDatingApp.API.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using myDatingApp.API.DTOs;
using System.Collections.Generic;
namespace myDatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController:ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo,IMapper mapper)
        {
            _repo=repo;
            _mapper=mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users=_repo.GetUsers();
            var userstoreturn = _mapper.Map<IEnumerable<UserForListDTO>>(users.Result);
            return Ok(userstoreturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var users=_repo.GetUser(id);
            var returnUser = _mapper.Map<UserForDetailedDTO>(users.Result);
            return Ok(returnUser);
        }
    }
}