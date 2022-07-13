using BabylonBazar.DSL;
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

        public UserController(UserService userService, ProductService productService, OrderService orderService)
        {
            _userService = userService;
            _productService = productService;
            _orderService = orderService;
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
        public IActionResult GetUserLocations(int userId)
        {
            List<Location> locations = _userService.GetLocations(userId);
            return View(locations);
        }

        public IActionResult GetUserCards(int userId)
        {
            List<CardInfo> cards = _userService.GetCardsForUser(userId);
            return View(cards);
        }
        [HttpGet]
        public IActionResult EditCredentials(int userId)
        {
            Users user = _userService.Get(userId);
            return View(user);
        }
        [HttpPost]
        public IActionResult EditCredentials(Users user)
        {
            _userService.Update(user);
            return View("ProfilePage", user.Id);
        }

        [HttpGet]
        public IActionResult EditLocation(int id)
        {
            Location location = _userService.GetLocation(id);
            return View(location);
        }
        [HttpPost]
        public IActionResult EditLocation(Location location)
        {
            _userService.UpdateLocation(location);
            return View("ProfilePage", location.UserId);
        }

    }
}
