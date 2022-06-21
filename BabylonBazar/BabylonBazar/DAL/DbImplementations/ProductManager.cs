using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class ProductManager: IProductManager
    {
        private readonly DbManager _dbManager;
        public ProductManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }

        public void Add(Product product)
        {
            _dbManager.Products.Add(product);
            _dbManager.SaveChanges();
        }

        public void Remove(int id)
        {
            Product? product = _dbManager.Products.Where(p => p.Id == id).FirstOrDefault();
            if (product is not null)
            {
                _dbManager.Products.Remove(product);
                _dbManager.SaveChanges();
            }
        }
        public Product? GetById(int id)
        {
            return _dbManager.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public IEnumerable<Product> GetAll()
        {
            return _dbManager.Products;
        }

        public IEnumerable<Product> GetProductsBySupplier(int supplierId)
        {
            return _dbManager.Products.Where(p => p.UserId == supplierId);
        }

        public void Update(Product product)
        {
            Product? existing = _dbManager.Products.FirstOrDefault(p => p.Id == product.Id);
            if (existing is null) return;
            existing.Description = product.Description;
            existing.Price = product.Price;
            existing.Name = product.Name;
            existing.Aproved = product.Aproved;
            _dbManager.Products.Update(existing);
            _dbManager.SaveChanges();
        }

    }
}
