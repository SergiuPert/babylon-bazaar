using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IRatingsManager: IBaseManagerWithUpdate<Ratings>
    {
        public double GetRatingForProduct(int productId);
        public IEnumerable<Ratings> GetRatingsFromUser(int userId);
    }
}
