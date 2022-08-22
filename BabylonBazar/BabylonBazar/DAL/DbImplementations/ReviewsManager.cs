using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class ReviewsManager : IReviewsManager
    {
        private readonly DbManager _dbManager;
        public ReviewsManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public int Add(Reviews item)
        {
            _dbManager.Reviews.Add(item);
            _dbManager.SaveChanges();
            return item.Id;
        }

        public IEnumerable<Reviews> GetAll()
        {
            return _dbManager.Reviews;
        }

        public Reviews? GetById(int id)
        {
            return _dbManager.Reviews.FirstOrDefault(r => r.Id == id);
        }

        public void Remove(int id)
        {
            Reviews? existing = _dbManager.Reviews.FirstOrDefault(r => r.Id == id);
            if (existing is null) return;
            _dbManager.Reviews.Remove(existing);
            _dbManager.SaveChanges();
        }

        public void Update(Reviews item)
        {
            Reviews? existing = _dbManager.Reviews.FirstOrDefault(r => r.Id == item.Id);
            if (existing is null) return;
            existing.Comment = item.Comment;
            existing.Rating = item.Rating;
            existing.Image = item.Image;
            _dbManager.Reviews.Update(existing);
            _dbManager.SaveChanges();
        }

        public IEnumerable<Reviews> GetReviewsForProduct(int productId){
            return _dbManager.Reviews.Where(r => r.ProductId == productId && !String.IsNullOrEmpty(r.Comment));
        }

        public double GetRatingForProduct(int productId) {
            List<Reviews> ratings=_dbManager.Reviews.Where(r => r.ProductId==productId).ToList();
            return (ratings.Count==0)?0:ratings.Average(r => r.Rating);
        }

    }
}
