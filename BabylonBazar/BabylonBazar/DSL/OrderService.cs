using BabylonBazar.DAL;
using BabylonBazar.Models;

namespace BabylonBazar.DSL {
	public class OrderService {
		private readonly IOrderManager _orderManager;
		private readonly IOrderItemManager _orderItemManager;
		private readonly ICartManager _cartManager;
		public OrderService(IOrderManager orderManager,IOrderItemManager orderItemManager,ICartManager cartManager) { 
			_orderManager = orderManager;
			_orderItemManager = orderItemManager;
			_cartManager = cartManager;
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
		public void ProcessUserOrder(int userId) { 
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
				_cartManager.Remove(cart);
			}
		}
	}
}
