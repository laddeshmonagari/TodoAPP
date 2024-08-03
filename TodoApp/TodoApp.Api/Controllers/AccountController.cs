using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Models;
using TodoApp.Models.DTO;
using TodoApp.Services.Contracts;

namespace TodoApp.Api.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IAccountService _accountService;
        private readonly RequestContext _requestContext;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IAccountService accountService, RequestContext requestContext)
        {
            _userManager = userManager; 
            _signInManager = signInManager;
            _accountService = accountService;
            _requestContext = requestContext;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(UserCreatedResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register(UserDTO signUpUser)
        {
            var user = new User { 
                UserName = signUpUser.UserName
            };
            var result = await _userManager.CreateAsync(user, signUpUser.Password);
            if (result.Succeeded)
                return Ok(new UserCreatedResponse
                {
                    IsSuccessfull = true,
                });
            return BadRequest("User creation Failed.");
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(UserResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login(UserDTO signInUser)
        {
            var result = await _signInManager.PasswordSignInAsync(signInUser.UserName, signInUser.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var activeuser = await _userManager.FindByNameAsync(signInUser.UserName);
                var tokenString = _accountService.GetAccessToken(activeuser);
                return Ok(new UserResponseDTO
                {
                    IsSuccessfulLogin = true,
                    Errors = null,
                    Token = tokenString
                });
            }
            return Unauthorized(new UserResponseDTO { Errors = new[] { "Invalid login attempt. Please enter valid username and password " } });
        }

        [HttpPost("logout")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = true });
        }

    }
}
