using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IOrderManager: IBaseManager<Order>
    {
        public IEnumerable<Order> GetAllOrdersForUser(int userId);
        public IEnumerable<Order> GetAllOrdersBetweenDates(DateTime fromDate, DateTime toDate);
    }
}
