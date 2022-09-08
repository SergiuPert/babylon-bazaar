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
        [HttpGet]
        public JsonResult NotificationsPage()
        {
            int userId = -1;
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Json("Unauthorised");
            }
            List<NotificationVM> notifications = new List<NotificationVM>();
            List<Notifications> userNotifications = _userService.GetUserNotifications(userId);
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
            int userId = -1;
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            _userService.CompleteNotification(id);
            return Ok("NotificationsPage");
        }
        [HttpGet]
        public JsonResult GetOrderHistory()
        {
            int userId = -1;
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Json("Unauthorised");
            }
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
        public JsonResult GetUserLocations()
        {
            int userId = -1;
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Json("Unauthorised");
            }
            List<Location> locations = _userService.GetLocations(userId);
            return Json(locations);
        }

        //[HttpGet]
        //public JsonResult GetUserCards(int id)
        //{
        //    List<CardInfo> cards = _userService.GetCardsForUser(id);
        //    return Json(cards);
        //}
        //[HttpPost]
        //public IActionResult AddCard([FromBody] CardDto card) {
        //    CardInfo cInfo = new();
        //    cInfo.CardNumber=card.CardNumber;
        //    cInfo.UserId=card.UserId;
        //    cInfo.OwnerName=card.OwnerName;
        //    cInfo.CVC=card.CVC;
        //    cInfo.ExpirationDate=DateTime.Parse(card.ExpirationDate);
        //    _userService.RegisterCard(cInfo);
        //    return Ok(new { message = "success" });
        //}
        //[HttpPost]
        //public IActionResult DeleteCard([FromRoute] int id)
        //{
        //    _userService.RemoveCard(id);
        //    return Ok();
        //}
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
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            _userService.RegisterLocation(location);
            return Ok(new { message = "success" });
        }
        [HttpPost]
        public IActionResult EditLocation([FromBody]Location location)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            _userService.UpdateLocation(location);
            return Ok();
        }
        [HttpPost]
        public IActionResult DeleteLocation([FromRoute]int id)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            _userService.RemoveLocation(id);
            return Ok();
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SavePhoto([FromForm] IFormFile _file,[FromForm] string target, string fileName)
        {
            if (_file == null) return BadRequest("No file sent");
            Console.WriteLine(_file);
            
            //this needs to be edited when we move to a server
            var fullFileName = Path.Combine(@".\wwwroot\Images\"+target+"\\"+fileName);
            using (var stream = System.IO.File.Create(fullFileName))
                await _file.CopyToAsync(stream);
            Console.WriteLine("a ajuns");
            return Ok("Photo saved");

        }

        public JsonResult GetUsernameById([FromRoute]int id)
        {
            Users? user = _userService.Get(id);
            return (user is null)?Json("No such User"):Json(user.Name);
        }
        
        [HttpPost]
        public IActionResult AddBalance([FromRoute]string sum)
        {
            int balance = Int32.Parse(Request.RouteValues.Values.ToList()[2].ToString());
            int userId;
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                userId = int.Parse(token.Issuer);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
            _userService.UpdateUserBalance(userId, balance);
            return Ok();
        }


    }
}
