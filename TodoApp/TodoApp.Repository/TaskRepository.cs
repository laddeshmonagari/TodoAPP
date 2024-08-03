using Microsoft.EntityFrameworkCore;
using TodoApp.Models;
using TodoApp.Repository.Contracts;

namespace TodoApp.Repository
{
    public class TaskRepository : ITaskRepository
      {
          private TodoAppDBContext _dbContext;

          public TaskRepository( TodoAppDBContext dbContext)
          {
              _dbContext = dbContext;
          }

          public TodoTask Add( TodoTask task)
          { 
              var result = _dbContext.Tasks.Add(task);
              _dbContext.SaveChanges();
              return result.Entity;
          }

          public List<TodoTask> Get(string userId)
          {
            return _dbContext.Tasks
                .Where(t => t.UserId == userId)
                .Include(t => t.User)
                .ToList();
          }

          public List<TodoTask> GetTasksByStatus(string userId, bool isCompleted)
          {
              IQueryable<TodoTask> userTasks = _dbContext.Tasks.Where(t => t.UserId == userId);

              if (isCompleted)
              {
                return userTasks.Where(t => t.IsCompleted == true).OrderByDescending(t => t.ModifiedOn).ToList();
              }
              return userTasks.Where(t => t.IsCompleted == false && t.DueDate >= DateTime.UtcNow).ToList();
          }

          public TodoTask GetTaskById(int taskId,string userId)
          {
              return _dbContext.Tasks.First(t => t.UserId == userId && t.ID == taskId );
          }

          public List<TodoTask> GetTodaysTasks(string userId)
          {
            var today = DateTime.UtcNow.Date;
            return _dbContext.Tasks
                            .Where(t => t.UserId == userId && t.DueDate.Date == today)
                            .ToList();
          }

          public bool Update(TodoTask task )
          {
              var existingTask = _dbContext.Tasks.FirstOrDefault(t => t.ID == task.ID);
              if (existingTask == null)
              {
                  throw new Exception("Task not found.");
              }
              _dbContext.Entry(existingTask).CurrentValues.SetValues(task);
              return _dbContext.SaveChanges() > 0;
          }

          public bool Delete(int taskId,string userId)
          {
              return _dbContext.Tasks.Where(t => t.ID == taskId && t.UserId == userId).ExecuteDelete() > 0;
          }

          public bool DeleteAll(int[] taskIds)
          {
            var tasks = _dbContext.Tasks.Where(t => taskIds.Contains(t.ID)).ToList();
            _dbContext.Tasks.RemoveRange(tasks);
            return _dbContext.SaveChanges() > 0;
          }
    }
}
