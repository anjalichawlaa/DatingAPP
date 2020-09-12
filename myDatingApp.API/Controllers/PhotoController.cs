using System.Threading;
using System.Security.Claims;
using System.Reflection.Metadata;
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
using Microsoft.Extensions.Options;
using myDatingApp.API.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Linq;
namespace myDatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Users/{userId}/Photos")]
    public class PhotoController:ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _settings;
        private Cloudinary _cloudinary;
        public PhotoController(IDatingRepository repo,IMapper mapper,IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _settings = cloudinaryConfig;
            _repo = repo;
            _mapper = mapper;

            Account Acc = new Account(_settings.Value.CloudName,
            _settings.Value.ApiKey,
             _settings.Value.ApiSecret);

             _cloudinary = new Cloudinary(Acc);
        }

[HttpGet("{id}",Name="GetPhoto")]
public async Task<IActionResult> GetPhoto(int id)
{
    var photofromRepo = await _repo.GetPhoto(id);
    var photo = _mapper.Map<PhotoReturnDTO>(photofromRepo);
    return Ok(photo);
}


        [HttpPost]
        public async Task<IActionResult> AddPhotForUser(int userId,
        [FromForm]PhotoCreationDTO photoCreationDTO)
        {
            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo =  _repo.GetUser(userId);

            var file = photoCreationDTO.File;

            var UploadResult = new ImageUploadResult();

            if(file.Length>0)
            {
                using (var stream= file.OpenReadStream())
                {
                    var UploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name,stream),
                        Transformation =new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    UploadResult = _cloudinary.Upload(UploadParams);

                }
            }
            photoCreationDTO.Url=UploadResult.Url.ToString();
            photoCreationDTO.PublicId = UploadResult.PublicId;

            var Photo  =_mapper.Map<Photo>(photoCreationDTO);

            if(!userFromRepo.Result.Photos.Any(u=>u.IsMain))
            {
                Photo.IsMain=true;
            }

            userFromRepo.Result.Photos.Add(Photo);

            if(await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoReturnDTO>(Photo);
                return CreatedAtRoute("GetPhoto",new {userId = userId , id = Photo.Id},
                photoToReturn);
            }
            return BadRequest("Not Uploaded");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> setMain(int userId,int id)
        {
             if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            if(!userFromRepo.Photos.Any(p=>p.Id==id))
                return Unauthorized();

            var photofromRepo = await _repo.GetPhoto(id);

            if(photofromRepo.IsMain)
                return BadRequest("Already Main Photo");

            var currentmainphoto = _repo.GetMainPhoto(userId);
            currentmainphoto.Result.IsMain=false;

            photofromRepo.IsMain=true;

            if(await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("not able to set main photo");
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> Delete(int userId,int id)
         {
             if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            if(!userFromRepo.Photos.Any(p=>p.Id==id))
                return Unauthorized();

            var photofromRepo = await _repo.GetPhoto(id);

            if(photofromRepo.IsMain)
                return BadRequest("Cant delete Main Photo");

            if(photofromRepo.PublicId!=null)
            {
                var deleteParams = new DeletionParams(photofromRepo.PublicId);
            var result = _cloudinary.Destroy(deleteParams);

                 if(result.Result=="OK")
                     _repo.Delete(photofromRepo);
            }
            else
            {
                 _repo.Delete(photofromRepo);
            }


            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete the photo");
         }



    }
}