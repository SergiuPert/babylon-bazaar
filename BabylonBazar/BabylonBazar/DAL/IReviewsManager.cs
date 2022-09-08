using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IReviewsManager: IBaseManagerWithUpdate<Reviews>
    {
        IEnumerable<Reviews> GetReviewsForProduct(int productId);
        double GetRatingForProduct(int productId);
        public IEnumerable<Reviews> GetAllRatingsForProduct(int productId);
    }
}
