namespace BabylonBazar.Models {
	public class Notifications:BaseModel {
		public int UserId { get; set; }
		public int OrderItemId { get; set; }
		public bool Completed { get; set; }
		public int LocationId { get; set; }
	}
}
