using BabylonBazar.DSL;
using BabylonBazar.Dtos;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace BabylonBazar.Controllers
{
    public class UserController: Controller
    {
        private UserService _userService;
        private ProductService _productService;
        private OrderService _orderService;
        private readonly JwtService _jwtService;

        public UserController(UserService userService, ProductService productService, OrderService orderService, JwtService jwtService)
        {
            _userService = userService;
            _productService = productService;
            _orderService = orderService;
            _jwtService = jwtService;
        }
        [EnableCors("Policy")]
        public JsonResult ProfilePage(int id)
        {
            Users user = _userService.Get(id);
            return Json(user);
        }
        [HttpGet]
        public JsonResult NotificationsPage(int id)
        {
            List<NotificationVM> notifications = new List<NotificationVM>();
            List<Notifications> userNotifications = _userService.GetUserNotifications(id);
            foreach (Notifications item in userNotifications)
            {
                NotificationVM notification = new NotificationVM();
                notification.notification = item;
                notification.orderItem = _orderService.GetOrderItem(item.OrderItemId);
                notification.product = _productService.GetProductById(notification.orderItem.ProductId);
                notification.location = _userService.GetLocation(item.LocationId);
                notification.order = _orderService.GetById(notification.orderItem.OrderId);
                notification.name = _userService.Get(notification.order.UserId).Name;
                notifications.Add(notification);
            }
            return Json(notifications);
        }
        [HttpPost]
        public IActionResult CompleteOrder([FromRoute] int id)
        {
            _userService.CompleteNotification(id);
            return Ok("NotificationsPage");
        }
        [HttpGet]
        public JsonResult GetOrderHistory()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);
            List<Order> orders = _orderService.GetOrdersForUser(userId);
            List<OrderVM> ordersVM = new List<OrderVM>();
            foreach(Order order in orders)
            {
                OrderVM orderVM = new OrderVM();
                orderVM.Order = order;
                orderVM.OrderItems = new List<OrderItemVM>();
                List<OrderItem> orderItems = _orderService.GetOrderItems(order.Id);
                foreach(OrderItem item in orderItems)
                {
                    OrderItemVM orderItemVM = new OrderItemVM();
                    orderItemVM.OrderItem = item;
                    orderItemVM.Product = _productService.GetProductById(item.ProductId);
                    orderVM.OrderItems.Add(orderItemVM);
                }
                ordersVM.Add(orderVM);
            }
            return Json(ordersVM);
        }
        [EnableCors("Policy")]
        public JsonResult GetUserLocations(int id)
        {
            List<Location> locations = _userService.GetLocations(id);
            return Json(locations);
        }

        public JsonResult GetUserCards(int id)
        {
            List<CardInfo> cards = _userService.GetCardsForUser(id);
            return Json(cards);
        }
        [HttpPost]
        public IActionResult AddCard([FromBody] CardDto card) {
            CardInfo cInfo = new();
            cInfo.CardNumber=card.CardNumber;
            cInfo.UserId=card.UserId;
            cInfo.OwnerName=card.OwnerName;
            cInfo.CVC=card.CVC;
            cInfo.ExpirationDate=DateTime.Parse(card.ExpirationDate);
            _userService.RegisterCard(cInfo);
            return Ok(new { message = "success" });
        }
        public IActionResult DeleteCard([FromRoute] int id)
        {
            _userService.RemoveCard(id);
            return Ok();
        }
        [HttpGet]
        public IActionResult EditCredentials(int userId)
        {
            Users user = _userService.Get(userId);
            return View(user);
        }
        [HttpPost]
        public IActionResult EditCredentials([FromBody]CredentialsDto credentials)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _userService.Get(userId);
                if(!String.IsNullOrEmpty(credentials.Email)) user.Email = credentials.Email;
                if(!String.IsNullOrEmpty(credentials.Password)) user.Password = credentials.Password;
                if(!String.IsNullOrEmpty(credentials.Name)) user.Name = credentials.Name;
                if(!String.IsNullOrEmpty(credentials.Image)) user.Image = credentials.Image;
                _userService.Update(user);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            return Ok(new { message = "success" });
        }
        [HttpPost]
        public IActionResult AddLocation([FromBody] Location location)
        {
            _userService.RegisterLocation(location);
            return Ok(new { message = "success" });
        }
        [HttpGet]
        public IActionResult EditLocation(int id)
        {
            Location location = _userService.GetLocation(id);
            return View(location);
        }
        [HttpPost]
        public IActionResult EditLocation([FromBody]Location location)
        {
            _userService.UpdateLocation(location);
            return View("ProfilePage", location.UserId);
        }
        [HttpPost]
        public IActionResult DeleteLocation([FromRoute]int id)
        {
            _userService.RemoveLocation(id);
            return Ok();
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SavePhoto([FromForm] IFormFile _file,[FromForm] string target, string fileName)
        {
            if (_file == null) return BadRequest("No file sent");
            //if (file.Length <= 0) return BadRequest("Empty File");
            Console.WriteLine(_file);
            //var receivedFileName = Path.GetFileName(_file);
            
            //this needs to be edited when we move to a server

            var fullFileName = Path.Combine(@".\wwwroot\Images\"+target+"\\"+fileName);
            using (var stream = System.IO.File.Create(fullFileName))
                await _file.CopyToAsync(stream);
            Console.WriteLine("a ajuns");
            return Ok("Photo saved");

        }

        public JsonResult GetUsernameById([FromRoute]int id)
        {
            Users user = _userService.Get(id);
            return Json(user.Name);
        }

        [HttpPost]
        public IActionResult AddBalance([FromRoute]string sum)
        {
            int balance = Int32.Parse(Request.RouteValues.Values.ToList()[2].ToString());
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);
            _userService.UpdateUserBalance(userId, balance);
            return Ok();
        }


    }
}
