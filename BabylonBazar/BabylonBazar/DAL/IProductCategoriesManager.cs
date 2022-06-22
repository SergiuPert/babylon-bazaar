using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IProductCategoriesManager: IBaseManager<ProductCategories>
    {
        public IEnumerable<ProductCategories> GetCategoriesForProduct(int productId);
        public IEnumerable<ProductCategories> GetProductsForCategory(int categoryId);
            public void Remove(ProductCategories productCategories);
    }
}
