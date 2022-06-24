using BabylonBazar.DAL;
using BabylonBazar.Models;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Session;

namespace BabylonBazar.DSL
{
    public class UserService
    {
        private readonly IUserManager _userManager;
        private readonly IOrderManager _orderManager;
        private readonly INotificationsManager _notificationsManager;
        private readonly ICardInfoManager _cardInfoManager;
        private readonly ILocationManager _locationManager;
        private readonly IOrderItemManager _orderItemManager;
        private readonly IProductManager _productManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IUserManager userManager, IOrderManager orderManager, 
            INotificationsManager notificationsManager, ICardInfoManager cardInfoManager, 
            ILocationManager locationManager, IOrderItemManager orderItemManager,
            IProductManager productManager,IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _orderManager = orderManager;
            _notificationsManager = notificationsManager;
            _cardInfoManager = cardInfoManager;
            _locationManager = locationManager;
            _orderItemManager = orderItemManager;
            _productManager = productManager;
            _httpContextAccessor=httpContextAccessor;
        }

        public void Register(string username, string password, string email)
        {
            Users user = new();
            user.Name = username;
            user.Password = password;
            user.Email = email;
            user.Role = "user";
            user.Balance = 0;
            _userManager.Add(user);
        }
        public int Login(string name, string password)
        {
            Users? user = _userManager.Login(name, password);
            if (user is not null)
            {
                _httpContextAccessor.HttpContext.Session.Set("user", Encoding.ASCII.GetBytes($"{user.Id}"));
                return user.Id;
            }
            return -1;
        }

        public void Remove(int userId)
        {
            _userManager.Remove(userId);
        }
        public void Logout()
        {
            _httpContextAccessor.HttpContext.Session.Remove("user");
        }

        public Users? Get(int userId)
        {
            return _userManager.GetById(userId);
        }
        public void Update(Users user)
        {
            _userManager.Update(user);
        }
        public List<Notifications> GetUserNotifications(int userId)
        {
            return _notificationsManager.GetNotificationsByUser(userId).ToList();
        }
        public List<Order> GetOrderHistory(int userId)
        {
            return _orderManager.GetAllOrdersForUser(userId).ToList();
        }
        public void RegisterCard(CardInfo card)
        {
            _cardInfoManager.Add(card);
        }
        public void RegisterLocation(Location location)
        {
            _locationManager.Add(location);
        }
        public void RemoveCard(int cardId)
        {
            _cardInfoManager.Remove(cardId);
        }
        public void RemoveLocation(int locationId)
        {
            _locationManager.Remove(locationId);
        }
        public void UpdateLocation(Location location)
        {
            _locationManager.Update(location);
        }
        public void TransferBalance()
        {
            Console.WriteLine("TOOOOOOOOO DOOOOOOOOOOOOO");
        }
        public void UpdateUserBalance(int userId, double balance)
        {
            Users? user = _userManager.GetById(userId);
            user.Balance += balance;
            _userManager.Update(user);
        }
        public Location GetLocation(int id)
        {
            return _locationManager.GetById(id);
        }
        public List<Location> GetLocations(int userId)
        {
            return _locationManager.GetLocationsForUser(userId).ToList();
        }
        public CardInfo GetCard(int id)
        {
            return _cardInfoManager.GetById(id);
        }

        public List<CardInfo> GetCardsForUser(int userId)
        {
            return _cardInfoManager.GetCardsForUser(userId).ToList();
        }
        public void CompleteNotification(int id)
        {
            Notifications notification = _notificationsManager.GetById(id);
            notification.Completed = true;
            OrderItem orderItem = _orderItemManager.GetById(notification.OrderItemId);
            Product product = _productManager.GetById(orderItem.ProductId);
            _notificationsManager.Update(notification);
            UpdateUserBalance(notification.UserId, product.Price * orderItem.Quantity);
        }
    }
}
