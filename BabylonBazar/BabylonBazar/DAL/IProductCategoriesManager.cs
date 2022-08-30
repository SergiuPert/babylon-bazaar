using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IProductCategoriesManager: IBaseManager<ProductCategories>
    {
        public IEnumerable<ProductCategories> GetCategoriesForProduct(int productId);
        public (IEnumerable<ProductCategories>, int) GetProductsForCategory(int categoryId, int page);
            public void Remove(ProductCategories productCategories);
    }
}
