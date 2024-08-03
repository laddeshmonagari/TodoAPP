namespace TodoApp.Models.DTO
{
    public class UserResponseDTO
    {
        public bool IsSuccessfulLogin { get; set; }
        public IEnumerable<string>? Errors { get; set; }
        public string? Token { get; set; }
    }
}
