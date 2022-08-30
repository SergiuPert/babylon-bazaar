using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface ICartManager
    {
        public void Add(Cart cart);

        public IEnumerable<Cart> GetAll();

        public Cart? GetById(int id);

        public void Remove(Cart cart);
        public void RemoveAll(Cart cart);

        public IEnumerable<Cart> GetCartItemsForUser(int userId);
    }
}
