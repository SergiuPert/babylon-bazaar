namespace BabylonBazar.Models {
	public class Ratings:BaseModel {
		public int ProductId { get; set; }
		public int UserId { get; set; }
		public int Rating { get; set; }
	}
}
