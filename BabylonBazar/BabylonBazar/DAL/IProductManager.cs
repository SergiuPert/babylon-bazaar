using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface IProductManager : IBaseManagerWithUpdate<Product>
    {
        IEnumerable<Product> GetProductsBySupplier(int supplierId);
    }
}
