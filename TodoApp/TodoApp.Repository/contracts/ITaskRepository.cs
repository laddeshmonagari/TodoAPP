using TodoApp.Models;

namespace TodoApp.Repository.Contracts
{
    public interface ITaskRepository
    {
        public TodoTask Add(TodoTask task);

        public List<TodoTask> Get(string userId);

        public List<TodoTask> GetTasksByStatus(string userId, bool isCompleted);

        public List<TodoTask> GetTodaysTasks(string userId);

        public TodoTask GetTaskById(int taskId, string userId);

        public bool Update(TodoTask task);

        public bool Delete(int taskId, string userId);

        public bool DeleteAll(int[] taskIds);

    }
}
