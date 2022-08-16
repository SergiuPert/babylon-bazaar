using BabylonBazar.DSL;
using BabylonBazar.Dtos;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult NotificationsPage(int id)
        {
            List<NotificationVM> notifications = new List<NotificationVM>();
            List<Notifications> userNotifications = _userService.GetUserNotifications(id);
            foreach (Notifications item in userNotifications)
            {
                NotificationVM notification = new NotificationVM();
                notification.notification = item;
                notification.product = _productService.GetProductDetails(id).product;
                notification.orderItem = _orderService.GetOrderItem(item.OrderItemId);
                notification.location = _userService.GetLocation(item.LocationId);
                notifications.Add(notification);
            }
            return View(notifications);
        }
        [HttpPost]
        public IActionResult CompleteOrder(int notificationId)
        {
            _userService.CompleteNotification(notificationId);
            return View("NotificationsPage");
        }
        public IActionResult GetOrderHistory(int userId)
        {
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
            return View(ordersVM);
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
                user.Email = credentials.Email;
                user.Password = credentials.Password;
                user.Name = credentials.Name;
                user.Image = credentials.Image;
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
        [HttpPost("savephoto")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SavePhoto([FromForm] ImageDto _file)
        {
            if (_file == null) return BadRequest("No file sent");
            //if (file.Length <= 0) return BadRequest("Empty File");

            var receivedFileName = Path.GetFileName(_file.FileName);

            //this needs to be edited when we move to a server
            var fullFileName = Path.Combine(@"D:\Code\Projects\BabylonBazar\el-proyecte-grande-sprint-1-csharp-Eagle-Thunder\BabylonBazar\BabylonBazar\wwwroot\Images\Users\",receivedFileName);

            using (var stream = System.IO.File.Create(fullFileName))
                await _file.File.CopyToAsync(stream);

            return Ok("Photo saved");

        }
    }
}
