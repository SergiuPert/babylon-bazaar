namespace BabylonBazar.Models {
	public class Cart:BaseModel {
		public int UserId { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
	}
}
