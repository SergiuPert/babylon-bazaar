using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class OrderManager : IOrderManager
    {
        private readonly DbManager _dbManager;
        public OrderManager(DbManager dbmanager)
        {
            _dbManager = dbmanager;
        }
        public int Add(Order item)
        {
            _dbManager.Order.Add(item);
            _dbManager.SaveChanges();
            return item.Id;
        }

        public IEnumerable<Order> GetAll()
        {
            return _dbManager.Order;
        }

        public IEnumerable<Order> GetAllOrdersBetweenDates(DateTime fromDate, DateTime toDate)
        {
            return _dbManager.Order.Where(o => o.Date > fromDate && o.Date < toDate);
        }

        public IEnumerable<Order> GetAllOrdersForUser(int userId)
        {
            return _dbManager.Order.Where(o => o.UserId == userId);
        }

        public Order? GetById(int id)
        {
            return _dbManager.Order.FirstOrDefault(o => o.Id == id);
        }

        public void Remove(int id)
        {
            Order? order = _dbManager.Order.FirstOrDefault(o => o.Id == id);
            if (order is not null)
            {
                _dbManager.Order.Remove(order);
                _dbManager.SaveChanges();
            }
        }
    }
}
