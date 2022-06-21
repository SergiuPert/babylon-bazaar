namespace BabylonBazar.Models {
	public class CardInfo:BaseModel {
		public int UserId { get; set; }
		public string CardNumber { get; set; }
		public string OwnerName { get; set; }
		public DateTime ExpirationDate { get; set; }
		public string CVC { get; set; }
	}
}
