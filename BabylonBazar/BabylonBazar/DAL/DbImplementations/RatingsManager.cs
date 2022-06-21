using BabylonBazar.Models;
using System.Linq;

namespace BabylonBazar.DAL
{
    public class RatingsManager : IRatingsManager
    {
        private readonly DbManager _dbManager;
        public RatingsManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(Ratings item)
        {
            _dbManager.Ratings.Add(item);
            _dbManager.SaveChanges();
        }

        public IEnumerable<Ratings> GetAll()
        {
            return _dbManager.Ratings;
        }

        public Ratings? GetById(int id)
        {
            return _dbManager.Ratings.FirstOrDefault(r => r.Id == id);
        }

        public double GetRatingForProduct(int productId)
        {
            return _dbManager.Ratings.Where(r => r.ProductId == productId).Average(r => r.Rating);
        }

        public IEnumerable<Ratings> GetRatingsFromUser(int userId)
        {
            return _dbManager.Ratings.Where(r => r.UserId == userId);
        }

        public void Remove(int id)
        {
            Ratings? existing = _dbManager.Ratings.FirstOrDefault(r => r.Id == id);
            if (existing is null) return;
            _dbManager.Ratings.Remove(existing);
            _dbManager.SaveChanges();
        }
        public void Update(Ratings rating)
        {
            Ratings? existing = _dbManager.Ratings.FirstOrDefault(r => r.Id != rating.Id);
            if (existing is null) return;
            existing.Rating = rating.Rating;
            _dbManager.Ratings.Update(existing);
            _dbManager.SaveChanges();
        }
    }
}
