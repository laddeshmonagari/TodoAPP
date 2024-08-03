using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TodoApp.Models;

namespace TodoApp.Services
{
  public static class SetAuditFields
  {
    public static void  SetAuditFieldsOnCreate(this TodoTask task, string userId)
    {
      task.CreatedOn = DateTime.Now;
      task.UserId = userId;
    }

    public static void SetAuditFieldsOnUpdate(this TodoTask task, string userId)
    {
      task.ModifiedOn = DateTime.Now;
      task.ModifiedBy = userId;
    }

  }
}
