using AutoMapper;
using TodoApp.Models;
using TodoApp.Models.DTO;
using TodoApp.Repository.Contracts;
using TodoApp.Services.Contracts;

namespace TodoApp.Services
{
  public class TaskService : ITaskService
    {
        private readonly IMapper _mapper;
        private readonly ITaskRepository _taskRepository;
        private readonly RequestContext _requestContext;

        public TaskService(IMapper mapper, ITaskRepository taskRepository, RequestContext requestContext)
        {
            _mapper = mapper;
            _taskRepository = taskRepository;
            _requestContext = requestContext;
        }

        public TodoTask Add(TaskDTO task)
        {
            TodoTask todoTask = _mapper.Map<TodoTask>(task);
            todoTask.SetAuditFieldsOnCreate(_requestContext.User.UserId);
            return _taskRepository.Add(todoTask);
        }

        public List<TaskResponseDTO> Get(bool? isCompleted = null)
        {
            string userId = _requestContext.User.UserId;
            List<TodoTask> result;
            if (isCompleted.HasValue)
            {
                result = _taskRepository.GetTasksByStatus(userId, isCompleted.Value);
            }
            else
            {
                result = _taskRepository.Get(userId);
            }
            return _mapper.Map<List<TaskResponseDTO>>(result);
        }

        public List<TaskResponseDTO> GetTodaysTasks()
        {
            var tasks = _taskRepository.GetTodaysTasks(_requestContext.User.UserId);
            return _mapper.Map<List<TaskResponseDTO>>(tasks);
        }

        public TodoTask GetTaskById(int taskId)
        {
            return _taskRepository.GetTaskById(taskId, _requestContext.User.UserId);
        }

        public bool Update(UpdateTaskDTO task)
        {
            var originalTask = _taskRepository.GetTaskById(task.Id, _requestContext.User.UserId);
            _mapper.Map(task, originalTask);
            originalTask.SetAuditFieldsOnUpdate(_requestContext.User.UserId);
            return _taskRepository.Update(originalTask);
        }

        public bool Delete(int taskId)
        {
            return _taskRepository.Delete(taskId, _requestContext.User.UserId);
        }

        public bool DeleteAll(int[] taskIds)
        {
            return _taskRepository.DeleteAll(taskIds);
        }

    }
}
