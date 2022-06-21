namespace BabylonBazar.Models {
	public class Product:BaseModel {
		public int UserId { get; set; }
		public string Name { get; set; }
		public double Price { get; set; }
		public string Description { get; set; }
		public bool Aproved { get; set; }
	}
}
