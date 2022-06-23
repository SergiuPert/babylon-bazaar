using BabylonBazar.DSL;
using BabylonBazar.Models;
using Microsoft.AspNetCore.Mvc;

namespace BabylonBazar.Controllers
{
    public class LoginController : Controller
    {
        private UserService _userService;

        public LoginController(UserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Register(string name, string email, string password)
        {
            _userService.Register(name, email, password);
            return View("Home");
        }
        [HttpGet]
        public IActionResult Login()
        {
            ViewBag.LoginSuccess = "Login Pending";
            return View();
        }
        [HttpPost]
        public IActionResult Login(string name, string passowrd)
        {
            int userId = _userService.Login(name, passowrd);
            if (userId >= 0)
            {
                return View("Home");
            }
            ViewBag.LoginSuccess = "Login Failed";
            return View("Login");
        }
    }
}
