using System.ComponentModel.DataAnnotations;
namespace myDatingApp.API.DTOs
{
    public class UserRegisterDTo
    {
        [Required]
        public string Username{get;set;}
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must enter password between 4 and 8 characters")]
        public string password{get;set;}
    }
}