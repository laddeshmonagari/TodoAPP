namespace TodoApp.Models.DTO
{
    public class UpdateTaskDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public required string Description { get; set; }

        public required DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
