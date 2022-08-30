using BabylonBazar.Models;

namespace BabylonBazar.ViewModels {
	[Serializable]
	public class ProductHeadersVM {
		public int pages { get; set; }
		public Product product { get; set; }
		public double rating { get; set; }
		public string supplier { get; set; }
		public Images image { get; set; }
		public List<Categories> categories { get; set; }

	}
}
