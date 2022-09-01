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

        public int Add(Product product)
        {
            _dbManager.Products.Add(product);
            _dbManager.SaveChanges();
            return product.Id;
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
        public IEnumerable<Product> GetFirstXProducts(int page)
        {
            int productsPerPage = 12;
            return _dbManager.Products.Where(p => p.Aproved == true).Skip(page*productsPerPage).Take(productsPerPage); //NOT USED
        }

        public (IEnumerable<Product>, int pages) GetAllProducts(int page)
        {
            int productsPerPage = 20;
            IEnumerable<Product> products = _dbManager.Products.Skip(page * productsPerPage).Take(productsPerPage).OrderBy(p => p.Aproved);
            int pages = (int)Math.Ceiling((decimal)(_dbManager.Products.Count()/productsPerPage));
        
            return (products, pages);
        }
        public void SwitchApproval(int id)
        {
            Product product = _dbManager.Products.FirstOrDefault(p => p.Id == id);
            product.Aproved = !product.Aproved;
            _dbManager.Products.Update(product);
            _dbManager.SaveChanges();
        }
    }
}
