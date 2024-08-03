using TodoApp.Models;

namespace TodoApp.Services.Contracts
{
  public interface IAccountService
    {
        public string GetAccessToken(User activeuser);
    }
}
