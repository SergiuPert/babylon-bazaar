using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface ICategoriesManager: IBaseManagerWithUpdate<Categories>
    {
        IEnumerable<Categories>GetCategoriesForProduct(int productId);
        IEnumerable<Categories> GetMainCategories();
    }
}
