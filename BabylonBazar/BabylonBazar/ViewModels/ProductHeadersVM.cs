using BabylonBazar.Models;

namespace BabylonBazar.ViewModels {
	[Serializable]
	public class ProductHeadersVM {
		public Product product;
		public double rating;
		public string supplier;
		public Images image;
		public List<Categories> categories;
		public ProductHeadersVM() { categories=new();product=new();image=new(); }

	}
}
