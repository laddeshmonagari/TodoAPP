using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApp.Models
{
    public class TodoTask
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        [Required]
        public string Title { get; set; }

        [MaxLength(80)]
        [Required]
        public string? Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public string? UserId { get; set; }

        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool? IsCompleted { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
