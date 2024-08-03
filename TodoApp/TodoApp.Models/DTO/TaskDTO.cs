using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public required string Description { get; set; }

        [Required]
        public required DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
