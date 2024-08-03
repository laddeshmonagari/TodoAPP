using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using TodoApp.Api.Middlewares;
using TodoApp.Models;
using TodoApp.Repository;
using TodoApp.Repository.Contracts;
using TodoApp.Services;
using TodoApp.Services.Contracts;


namespace TodoApp.Api
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      //Serilog configaration
      Log.Logger = new LoggerConfiguration()
                  .WriteTo.File("Log/log.txt", rollingInterval: RollingInterval.Day)
                  .CreateLogger();
      builder.Host.UseSerilog();

      IConfigurationRoot configuration = new ConfigurationBuilder()
     .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
     .AddJsonFile("appsettings.json")
     .Build();

      builder.Services.AddScoped<RequestContextBuilder>();
      builder.Services.AddScoped(options =>
      {
        var result = options.GetRequiredService<RequestContextBuilder>();
        return result.Build();
      });

      builder.Services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      })
          .AddJwtBearer(options =>
          {
            options.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidateLifetime = true,
              ValidIssuer = builder.Configuration["Jwt:Issuer"],
              ValidAudience = builder.Configuration["Jwt:Audience"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
          });
      builder.Services.AddSwaggerGen(c =>
      {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description = "Enter your Authorization Key",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.Http,
          BearerFormat = "JWT",
          Scheme = "Bearer"
        });
        c.AddSecurityRequirement(
                  new OpenApiSecurityRequirement
              {
                        {
                        new OpenApiSecurityScheme
                        {
                        Reference = new OpenApiReference
                            { Type = ReferenceType.SecurityScheme, Id = "Bearer"}
                        }, new string[] { } }
              });
      });
      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowAll", builder =>
              {
            builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
          });
      });

      var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");
      builder.Services.AddDbContext<TodoAppDBContext>(options => options.UseSqlServer(connectionString));

      builder.Services.AddIdentity<User, IdentityRole>()
                      .AddEntityFrameworkStores<TodoAppDBContext>();

      builder.Services.AddAutoMapper(typeof(MappingProfile));
      builder.Services.AddControllers();
      builder.Services.AddEndpointsApiExplorer();

      builder.Services.AddScoped<ITaskService, TaskService>();
      builder.Services.AddScoped<ITaskRepository, TaskRepository>();
      builder.Services.AddScoped<IAccountService, AccountService>();
      builder.Services.AddHttpContextAccessor();
      
      builder.Services.AddSingleton<IConfiguration>(provider => configuration);
      builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

      var app = builder.Build();

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();
      app.UseExceptionHandler(_ => { });

      app.UseCors("AllowAll");
      app.UseAuthentication();
      app.UseAuthorization();

      app.MapControllers();

      app.Run();
    }
  }
}
