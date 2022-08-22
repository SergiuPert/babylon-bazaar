using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class ProductCategoriesManager : IProductCategoriesManager
    {
        private readonly DbManager _dbManager;
        public ProductCategoriesManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public int Add(ProductCategories item)
        {
            ProductCategories? productCategories = _dbManager.ProductCategories.FirstOrDefault(c => c.CategoryId == item.CategoryId && c.ProductId == item.ProductId);
            if (productCategories is null) _dbManager.ProductCategories.Add(item);
            _dbManager.SaveChanges();
            return item.Id;
        }

        public IEnumerable<ProductCategories> GetAll()
        {
            return _dbManager.ProductCategories;
        }

        public ProductCategories? GetById(int id)
        {
            return _dbManager.ProductCategories.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<ProductCategories> GetCategoriesForProduct(int productId) {
            return _dbManager.ProductCategories.Where(c => c.ProductId==productId);
        }

        public IEnumerable<ProductCategories> GetProductsForCategory(int categoryId) {
            return _dbManager.ProductCategories.Where(c => c.CategoryId==categoryId);
        }

        public void Remove(ProductCategories productCategories)
        {
            ProductCategories? existing = _dbManager.ProductCategories.FirstOrDefault(c => c.CategoryId == productCategories.CategoryId && c.ProductId == productCategories.ProductId);
            if (existing is null) return;
            _dbManager.ProductCategories.Remove(existing);
            
            _dbManager.SaveChanges();
        }

        public void Remove(int id)
        {
            ProductCategories? existing = _dbManager.ProductCategories.FirstOrDefault(c => c.ProductId == id);
            if (existing is null) return;
            _dbManager.ProductCategories.Remove(existing);
            _dbManager.SaveChanges();
        }
    }
}
