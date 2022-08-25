using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class CartManager:ICartManager
    {
        private readonly DbManager _dbManager;
        public CartManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(Cart cart)
        {
            Cart? existing = _dbManager.Cart.FirstOrDefault(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);
            if (existing is null)
            {
                _dbManager.Cart.Add(cart);
            }
            else
            {
                existing.Quantity += cart.Quantity;
                _dbManager.Cart.Update(existing);
            }
            _dbManager.SaveChanges();
        }

        public IEnumerable<Cart> GetAll()
        {
            return _dbManager.Cart;
        }

        public Cart? GetById(int id)
        {
            return _dbManager.Cart.FirstOrDefault(o => o.Id == id);
        }

        public void Remove(Cart cart)
        {
            Cart? existing = _dbManager.Cart.FirstOrDefault(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);
            if (existing is null) return;
            existing.Quantity -= 1;
            _dbManager.Cart.Update(existing);
            if (existing.Quantity <= 0)
            {
                _dbManager.Cart.Remove(cart);
            }
            _dbManager.SaveChanges();
        }

        public IEnumerable<Cart> GetCartItemsForUser(int userId)
        {
            IEnumerable<Cart> result = _dbManager.Cart.Where(c => c.UserId == userId);
            return result;
        }
    }
}
