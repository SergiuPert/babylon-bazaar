using Microsoft.EntityFrameworkCore;

namespace BabylonBazar.Models {
	public class DbManager:DbContext {
		public DbSet<Users> Users { get; set; }
		public DbSet<Reviews> Reviews { get; set; }
		public DbSet<Cart> Cart { get; set; }
		public DbSet<Order> Order { get; set; }
		public DbSet<OrderItem> OrderItem { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<Images> Images { get; set; }
		public DbSet<Ratings> Ratings { get; set; }
		public DbSet<CardInfo> CardInfo { get; set; }
		public DbSet<Location> Location { get; set; }
		public DbSet<Categories> Categories { get; set; }
		public DbSet<ProductCategories> ProductCategories { get; set; }
		public DbManager(DbContextOptions<DbManager> options) : base(options) { }

	}
}
