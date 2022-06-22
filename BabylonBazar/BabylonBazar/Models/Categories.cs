namespace BabylonBazar.Models {
	public class Categories:BaseModel {
		public string Name { get; set; }
		public int ParentId { get; set; }
	}
}
