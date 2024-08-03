using Microsoft.AspNetCore.Diagnostics;
using Serilog;
using TodoApp.Models.DTO;

namespace TodoApp.Api.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            Log.Error("Error occurred.", exception);
            var errorResponse = new ErrorResponseDTO
            {
                StatusCode = httpContext.Response.StatusCode,
                Message = exception.Message
            };
            await httpContext.Response.WriteAsJsonAsync(errorResponse);
            return true;
        }
    }
}
