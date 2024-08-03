using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Models;
using TodoApp.Models.DTO;
using TodoApp.Services.Contracts;

namespace TodoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TaskController : ControllerBase
    {
        private ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(TodoTask),StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Create(TaskDTO task)
        {
            var createdTask = _taskService.Add(task);
            return Ok(createdTask);
        }

        [HttpGet]
        [ProducesResponseType(typeof(TaskResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get(bool? isCompleted = null)
        {
            var tasks = _taskService.Get(isCompleted);
            return Ok(tasks);
        }

        [HttpGet("GetTodaysTasks")]
        [ProducesResponseType(typeof(TaskResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            var tasks = _taskService.GetTodaysTasks();
            return Ok(tasks);
        }

        [HttpPut]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Update(UpdateTaskDTO task)
        {
            bool isUpdated = _taskService.Update(task);
            return Ok(isUpdated);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Delete(int taskId)
        {
            bool isDeleted = _taskService.Delete(taskId);
            return Ok(isDeleted);
        }

        [HttpPost("DeleteAll")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteAll(int[] taskIds)
        {
            bool isAllDeleted = _taskService.DeleteAll(taskIds);
            return Ok(isAllDeleted);
        }
    }
}
