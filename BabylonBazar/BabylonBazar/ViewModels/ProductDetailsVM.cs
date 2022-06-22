using BabylonBazar.Models;

namespace BabylonBazar.ViewModels {
	public class ProductDetailsVM {
		public Product product;
		public List<Reviews> reviews;
		public double rating;
		public string supplier;
		public List<Images> images;
		public List<Categories> categories;
	}
}
