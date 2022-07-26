using BabylonBazar.DSL;
using BabylonBazar.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

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
        //[HttpGet]
        //public IActionResult Login()
        //{
        //    ViewBag.LoginSuccess = "Login Pending";
        //    return View();
        //}
        [HttpGet]
        public JsonResult Login(string id)
        {
            //JsonNode Credentials = JsonNode.Parse(credentials)!;
            //string name = Credentials!["username"]!.ToString();
            //string passowrd = Credentials!["passowrd"]!.ToString();
            Console.WriteLine("Id: "+id);
            string name = id.Split("^")[0];
            string password = id.Split("^")[1];
            int userId = _userService.Login(name, password);
            Console.WriteLine(name+" - "+password+" - "+userId);
            return Json(userId);
        }
    }
}
