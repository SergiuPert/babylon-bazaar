using BabylonBazar.Models;

namespace BabylonBazar.ViewModels
{
    public class CartVM
    {
        public Users user { get; set; }
        public List<CartProductsVM> products { get; set; }
    }
}
