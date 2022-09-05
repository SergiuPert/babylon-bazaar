using BabylonBazar.Configuration;
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
            services.Configure<StripeOptions>(options =>
            {
                options.SecretKey = "sk_test_51LeboKCsWiaXBlU74Xn2Ts1rVWLZZvnVGW1ggf8AzadSg9jw6QFVzRl8ugP2H1sKYet7asxwc7xbZy8YpfX3AF9D003weM7Nv7";
                options.PublishableKey = "pk_test_51LeboKCsWiaXBlU7KaYvzA2RTLMIYLhL1JiH7x6PqJPyL9Iwxz0eBfQg6bAzrYVvbkRjCKSgUphCsYkgZEVPXqje0020Wgv3lP";
                options.WebhookSecret = "whsec_37f6abc2bbb37596969bad4eb1b60f3bcd9198e39df689091246c4b78258453f";
            });
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
                .AddScoped<JwtService>()
                .AddCors(options =>
                {
                    options.AddPolicy(name: "Policy",
                        builder =>
                        {
                            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                            builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                        }
                        );
                })
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
                .UseCors(builder =>  builder
                    .WithOrigins(new[] { "http://localhost:3000", "http://localhost:3000/cart", "http://localhost:3000/register" })
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials() 
                )
                //.UseAuthentication()
                //.UseAuthorization()
                .UseEndpoints(endpoints => {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Bazar}/{action=List}/{id?}");
                    endpoints.MapRazorPages();
            });
        }
    }
}
