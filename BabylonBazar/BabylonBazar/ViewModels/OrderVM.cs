using BabylonBazar.Models;

namespace BabylonBazar.ViewModels
{
    public class OrderVM
    {
        public Order Order { get; set; }
        public List<OrderItemVM> OrderItems { get; set; }
    }
}
