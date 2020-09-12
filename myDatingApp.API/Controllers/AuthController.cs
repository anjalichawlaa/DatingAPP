using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using myDatingApp.API.Data;
using myDatingApp.API.Models;
using System.Threading.Tasks;
using myDatingApp.API.DTOs;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
namespace myDatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
         private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo,IConfiguration config,IMapper mapper)
        {
            _repo=repo;
            _config=config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTo userRegister)
        {
            userRegister.Username=userRegister.Username.ToLower();
            if(await _repo.UserExists(userRegister.Username))
                return BadRequest("User Already Exists");
            
            var userToCreate=new User{
                UserName=userRegister.Username
            };
            var createdUser = await _repo.Register(userToCreate,userRegister.password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto user)
        {
            
            var userloginrepo=await _repo.Login(user.username.ToLower(),user.password);
           
           
            if(userloginrepo==null)
                return Unauthorized();
            
            var claims = new[]{
                new Claim(
                    ClaimTypes.NameIdentifier,userloginrepo.Id.ToString()
                ),
                new Claim(
                    ClaimTypes.Name,userloginrepo.UserName
                )
            };

            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokendescriptor=new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor{
                Subject=new ClaimsIdentity(claims),
                Expires=DateTime.Now.AddDays(1),
                SigningCredentials=cred
            };
        var tokenhandler =new JwtSecurityTokenHandler();
        var token=tokenhandler.CreateToken(tokendescriptor);
 var userreturn = _mapper.Map<UserForListDTO>(userloginrepo);
        return Ok(
            new{
                token=tokenhandler.WriteToken(token),
                userreturn
            }
        );
        }
    }
}