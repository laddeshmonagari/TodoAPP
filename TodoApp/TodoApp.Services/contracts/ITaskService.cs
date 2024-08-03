using TodoApp.Models.DTO;
using TodoApp.Models;

namespace TodoApp.Services.Contracts
{
    public interface ITaskService
    {
        public TodoTask Add(TaskDTO task);

        public List<TaskResponseDTO> Get(bool? isCompleted = null);

        public List<TaskResponseDTO> GetTodaysTasks();

        public TodoTask GetTaskById(int taskId);

        public bool Update(UpdateTaskDTO task);

        public bool Delete(int taskId);

        public bool DeleteAll(int[] taskIds);

    }
}
