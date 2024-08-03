using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.DTO
{
    public class ResetPassword
    {
        //[Required(ErrorMessage = "UserName is required.")]
        //public string UserName { get; set; }

        [Required(ErrorMessage = "OldPassword is required.")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "NewPassword is required.")]
        public string NewPassword { get; set; }
    }
}
