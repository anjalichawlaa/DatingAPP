using System.Security.AccessControl;
using System.Runtime.InteropServices;
using System.ComponentModel;
using AutoMapper;
using myDatingApp.API.Models;
using myDatingApp.API.DTOs;
using System.Linq;
namespace myDatingApp.API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User,UserForListDTO>()
            .ForMember(dest=>dest.PhotoUrl,
            opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalcAge()));
            CreateMap<User,UserForDetailedDTO>()
             .ForMember(dest=>dest.PhotoUrl,
            opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
             .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalcAge()));
            CreateMap<Photo,PhotosForDetailedDTO>();

            CreateMap<UserUpdateDTO,User>();
        }
        
    }
}