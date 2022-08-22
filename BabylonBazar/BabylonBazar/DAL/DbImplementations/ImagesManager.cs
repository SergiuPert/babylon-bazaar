using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class ImagesManager : IImagesManager
    {
        private readonly DbManager _dbManager;
        public ImagesManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public int Add(Images item)
        {
            _dbManager.Images.Add(item);
            _dbManager.SaveChanges();
            return item.Id;
        }

        public IEnumerable<Images> GetAll()
        {
            return _dbManager.Images;
        }

        public Images? GetById(int id)
        {
            return _dbManager.Images.FirstOrDefault(i => i.Id == id);
        }

        public void Remove(int id)
        {
            Images? image = _dbManager.Images.FirstOrDefault(i => i.Id == id);
            if (image is null) return;
            _dbManager.Images.Remove(image);
            _dbManager.SaveChanges();
        }

        public IEnumerable<Images> GetImagesForProduct(int productId)
        {
            return _dbManager.Images.Where(i => i.ProductId == productId);
        }
    }
}
