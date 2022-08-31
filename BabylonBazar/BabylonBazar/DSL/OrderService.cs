using BabylonBazar.DAL;
using BabylonBazar.Models;

namespace BabylonBazar.DSL {
	public class OrderService {
		private readonly IOrderManager _orderManager;
		private readonly IOrderItemManager _orderItemManager;
		private readonly ICartManager _cartManager;
		private readonly INotificationsManager _notificationsManager;
		private readonly IProductManager _productManager;
		public OrderService(IOrderManager orderManager,IOrderItemManager orderItemManager,ICartManager cartManager, 
			INotificationsManager notificationsManager, IProductManager productManager) { 
			_orderManager = orderManager;
			_orderItemManager = orderItemManager;
			_cartManager = cartManager;
			_notificationsManager = notificationsManager;
			_productManager = productManager;
		}
		public void AddToUserCart(int userId,int productId,int quantity) {
			Cart cart = new();
			cart.UserId = userId;
			cart.ProductId = productId;
			cart.Quantity = quantity;
			_cartManager.Add(cart);
		}
		public void RemoveFromUserCart(Cart cart) {
			_cartManager.Remove(cart);
		}
		public List<Cart> GetUserCart(int userId) { 
			return _cartManager.GetCartItemsForUser(userId).ToList();
		}
		public int ProcessUserOrder(int userId) { 
			List<Cart> carts = GetUserCart(userId);
			Order order = new();
			order.UserId = userId;
			order.Date=DateTime.Now;
			_orderManager.Add(order);
			//order might bneed regetting
			foreach(Cart cart in carts) {
				OrderItem entry = new();
				entry.OrderId=order.Id;
				entry.ProductId=cart.ProductId;
				entry.Quantity=cart.Quantity;
				_orderItemManager.Add(entry);
			}
			foreach(Cart cart in carts) {
				_cartManager.RemoveAll(cart);
			}
			return order.Id;
		}
		public OrderItem GetOrderItem(int Id)
        {
			return _orderItemManager.GetById(Id);
        }
		public List<Order> GetOrdersForUser(int userId)
        {
			return _orderManager.GetAllOrdersForUser(userId).ToList();
        }

		public List<OrderItem> GetOrderItems(int orderId)
        {
			return _orderItemManager.GetOrderItemsForOrder(orderId).ToList();
        }
		public Cart GetCartById(int id)
        {
			return _cartManager.GetById(id);
        }
		public void SendNotifications(int orderId, int locationId)
        {
			List<OrderItem> items = _orderItemManager.GetOrderItemsForOrder(orderId).ToList();
			foreach(OrderItem item in items)
            {
				Notifications notification = new Notifications();
				notification.UserId = _productManager.GetById(item.ProductId).UserId;
				notification.OrderItemId = item.Id;
				notification.LocationId = locationId;
				_notificationsManager.Add(notification);
            }
        }
		public double GetTotalOrderCost(int userId)
        {
			double total = 0;
			List<Cart> cart = _cartManager.GetCartItemsForUser(userId).ToList();
			foreach (Cart cartItem in cart)
            {
				Product product = _productManager.GetById(cartItem.ProductId);
				total += product.Price * cartItem.Quantity;
            }
			return total;
		}
		public Order? GetById(int id)
        {
			return _orderManager.GetById(id);
        }
	}
}
