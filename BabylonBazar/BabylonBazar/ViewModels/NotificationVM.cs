using BabylonBazar.Models;

namespace BabylonBazar.ViewModels
{
    public class NotificationVM
    {
        public Notifications notification { get; set; }
        public Location location { get; set; }
        public OrderItem orderItem { get; set; }
        public Product product { get; set; }
    }
}
