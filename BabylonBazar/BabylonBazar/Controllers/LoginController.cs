using BabylonBazar.DSL;
using BabylonBazar.Dtos;
using BabylonBazar.Models;
using Microsoft.AspNetCore.Mvc;

namespace BabylonBazar.Controllers
{
    public class LoginController : Controller
    {
        private UserService _userService;
        private readonly JwtService _jwtService;

        public LoginController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }
        [HttpPost]
        public IActionResult Register([FromBody]RegisterDto dto)
        {
            var userData = _userService.Register(dto.Name, dto.Password, dto.Email);
            return Created("Success", userData);
        }
        [HttpPost]
        public IActionResult Login([FromBody]LoginDto dto)
        {
            Users? user = _userService.Login(dto.Username, dto.Password);
            if (user == null) return BadRequest( new { message = "Invalid credentials" });
            
            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new {message = "success"});
        }

        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _userService.Get(userId);
                return Ok(user);
            } 
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });
        }

    }
}
