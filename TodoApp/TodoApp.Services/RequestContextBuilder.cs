using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using TodoApp.Models.DTO;
using TodoApp.Models;


namespace TodoApp.Services
{
  public class RequestContextBuilder
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    public RequestContextBuilder(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public RequestContext Build()
    {
      var httpContext = _httpContextAccessor.HttpContext;
      var userId = httpContext?.User.FindFirstValue("userId");
      var userName = httpContext?.User.FindFirstValue("userName");
      if (httpContext.User.Identity.IsAuthenticated)
      {
        var user = new UserInfoDTO
        {
          UserId = userId,
          UserName = userName,
        };
        return new RequestContext(user);
      }
      return new RequestContext(new UserInfoDTO { });
      
    }
  }
}
