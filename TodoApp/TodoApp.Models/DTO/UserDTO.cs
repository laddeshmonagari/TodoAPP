using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.DTO
{
    public class UserDTO
    {
        [Required(ErrorMessage = "UserName is required.")]
        public string UserName  { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}
