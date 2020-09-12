using Microsoft.AspNetCore.Http;
using System;
namespace myDatingApp.API.DTOs
{
    public class PhotoCreationDTO
    {
        public string Url{get;set;}
        public IFormFile File{get;set;}

        public string Description{get;set;}

        public DateTime DateAdded{get;set;}

        public string PublicId{get;set;}

        public PhotoCreationDTO()
        {
            DateAdded = DateTime.Now;
        }
    }
}