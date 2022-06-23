using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IOrderItemManager: IBaseManager<OrderItem>
    {
        public IEnumerable<OrderItem> GetOrderItemsForOrder(int orderId);
    }
}
