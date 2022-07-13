using BabylonBazar.Models;

namespace BabylonBazar.ViewModels {
	public class ProductDetailsVM {
		public Product product { get; set; }
		public List<Reviews> reviews { get; set; }
		public double rating { get; set; }
		public string supplier { get; set; }
		public List<Images> images { get; set; }
		public List<Categories> categories { get; set; }
	}
}
