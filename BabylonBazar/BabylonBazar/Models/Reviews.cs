namespace BabylonBazar.Models {
	public class Reviews :BaseModel{
		public int ProductId { get; set; }
		public int UserId { get; set; }
		public string Comment { get; set; }
		public int Rating { get; set; }
		public string? Image { get; set; }
	}
}
