using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Repository
{
    public class TodoAppDBContext : IdentityDbContext<User>
    {
        public TodoAppDBContext(DbContextOptions<TodoAppDBContext> options) : base(options) { }
        public DbSet<TodoTask> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
