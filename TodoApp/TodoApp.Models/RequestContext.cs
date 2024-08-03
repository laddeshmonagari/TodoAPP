using TodoApp.Models.DTO;

namespace TodoApp.Models
{
  public class RequestContext
  {
    public UserInfoDTO User { get; set; }

    public RequestContext(UserInfoDTO user)
    {
      User = user;
    }
  }

}
