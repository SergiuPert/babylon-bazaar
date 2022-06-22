using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IImagesManager: IBaseManager<Images>
    {
        public IEnumerable<Images> GetImagesForProduct(int productId);
    }
}
