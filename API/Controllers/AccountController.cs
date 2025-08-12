using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName
        };
        
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        
        if (result.Succeeded)
        {
            return Ok();
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }
        
        return ValidationProblem(ModelState);
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult<User>> GetUserInfo()
    {
        if(User.Identity?.IsAuthenticated == false)
        {
            return Unauthorized();
        }
        
        var user = await signInManager.UserManager.GetUserAsync(User);
        
        if (user == null)
        {
            return NotFound();
        }

        return Ok(new
        {
            user.UserName,
            user.DisplayName,
            user.Bio,
            user.ImageUrl
        });
    }
    
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
    
    
}