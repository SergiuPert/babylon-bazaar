using BabylonBazar.DAL;
using BabylonBazar.DAL.DbImplementations;
using BabylonBazar.DSL;
using BabylonBazar.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BabylonBazar {
    public class Startup {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration) => Configuration = configuration;
        public void ConfigureServices(IServiceCollection services) {
            services.AddDbContext<DbManager>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")))
				.AddScoped<ICardInfoManager,CardInfoManager>()
                .AddScoped<ICartManager,CartManager>()
                .AddScoped<ICategoriesManager,CategoriesManager>()
                .AddScoped<IImagesManager,ImagesManager>()
                .AddScoped<ILocationManager,LocationManager>()
                .AddScoped<INotificationsManager,NotificationsManager>()
                .AddScoped<IOrderItemManager,OrderItemManager>()
                .AddScoped<IOrderManager,OrderManager>()
                .AddScoped<IProductCategoriesManager,ProductCategoriesManager>()
                .AddScoped<IProductManager,ProductManager>()
                .AddScoped<IReviewsManager,ReviewsManager>()
                .AddScoped<IUserManager,UserManager>()
                .AddScoped<OrderService>()
                .AddScoped<ProductService>()
                .AddScoped<UserService>()
                .AddHttpContextAccessor()
                .AddSession();
//            services.AddDefaultIdentity<IdentityUser>().AddEntityFrameworkStores<AppDbContext>();
            services.AddControllersWithViews();
            services.AddRazorPages();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            else app.UseExceptionHandler("/Product/Error").UseHsts();
            app.UseHttpsRedirection()
                .UseStaticFiles()
                .UseSession()
                .UseRouting()
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints => {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Bazar}/{action=List}/{id?}");
                    endpoints.MapRazorPages();
            });
        }
    }
}