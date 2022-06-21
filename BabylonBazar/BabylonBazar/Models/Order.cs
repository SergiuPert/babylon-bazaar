namespace BabylonBazar.Models {
	public class Order:BaseModel {
		public int UserId { get; set; }
		public DateTime Date { get; set; }
	}
}
