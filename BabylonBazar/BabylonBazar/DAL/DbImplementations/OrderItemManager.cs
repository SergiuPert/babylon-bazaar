using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class OrderItemManager : IOrderItemManager
    {
        private readonly DbManager _dbManager;
        public OrderItemManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(OrderItem item)
        {
            _dbManager.OrderItem.Add(item);
            _dbManager.SaveChanges();
        }

        public IEnumerable<OrderItem> GetAll()
        {
            return _dbManager.OrderItem;
        }

        public OrderItem? GetById(int id)
        {
            return _dbManager.OrderItem.FirstOrDefault(o => o.Id == id);
        }

        public void Remove(int id)
        {
            OrderItem? orderItem = _dbManager.OrderItem.FirstOrDefault(o => o.Id == id);
            if (orderItem is not null)
            {
                _dbManager.OrderItem.Remove(orderItem);
                _dbManager.SaveChanges();
            }
        }
        public IEnumerable<OrderItem> GetOrderItemsForOrder(int orderId)
        {
            return _dbManager.OrderItem.Where(o => o.OrderId == orderId);
        }
    }
}
