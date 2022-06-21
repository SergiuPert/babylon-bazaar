namespace BabylonBazar.Models {
	public class Users:BaseModel {
		public string Name { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string Role { get; set; }
		public double Balance { get; set; }
		public string? Image { get; set; }
	}
}
