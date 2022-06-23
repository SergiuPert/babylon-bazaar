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
        private HttpContext _httpContext;

        public UserService(IUserManager userManager, IOrderManager orderManager, 
            INotificationsManager notificationsManager, ICardInfoManager cardInfoManager, ILocationManager locationManager, HttpContext httpContext)
        {
            _userManager = userManager;
            _orderManager = orderManager;
            _notificationsManager = notificationsManager;
            _cardInfoManager = cardInfoManager;
            _locationManager = locationManager;
            _httpContext = httpContext;
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
                _httpContext.Session.Set("user", Encoding.ASCII.GetBytes($"{user.Id}"));
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
            _httpContext.Session.Remove("user");
        }

        public Users? Get(int userId)
        {
            return _userManager.GetById(userId);
        }
        public void Update(Users user)
        {
            _userManager.Update(user);
        }
        public List<Notifications> GetUSerNotifications(int userId)
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
        public void UpdateUserBalance(int userId, int balance)
        {
            Users? user = _userManager.GetById(userId);
            user.Balance += balance;
            _userManager.Update(user);
        }





    }
}
