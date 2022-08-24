using BabylonBazar.DSL;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace BabylonBazar.Controllers
{
    public class OrderController : Controller
    {
        private OrderService _orderService;
        private ProductService _productService;
        private UserService _userService;
        private IHttpContextAccessor _contextAccessor;
        private readonly JwtService _jwtService;
        public OrderController(OrderService orderService, ProductService productService, UserService userService, IHttpContextAccessor httpContextAccessor, JwtService jwtService)
        {
            _orderService = orderService;
            _productService = productService;
            _contextAccessor = httpContextAccessor;
            _userService = userService;
            _jwtService = jwtService;
        }
        [EnableCors("Policy")]
        public JsonResult Cart(int id)
        {
            //byte[] userByte = _contextAccessor.HttpContext.Session.Get("user");
            //int userId = int.Parse(Encoding.ASCII.GetString(userByte));

            CartVM cartVM = new CartVM();
            Users user = _userService.Get(id);
            List<Cart> carts = _orderService.GetUserCart(id);
            List<CartProductsVM> products = new List<CartProductsVM>();
            foreach (Cart cartItem in carts)
            {
                CartProductsVM cart = new CartProductsVM();
                cart.Cart = cartItem;
                cart.Product = _productService.GetProductById(cartItem.ProductId);
                products.Add(cart);
            }
            cartVM.user = user;
            cartVM.products = products;
            return Json(cartVM);
        }
        [HttpPost]
        public IActionResult AddToCart([FromRoute]int id)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);
            _orderService.AddToUserCart(userId, id, 1);
            return Ok();
        }
        [HttpPost]
        public IActionResult RemoveFromCart(int cartId)
        {
            Cart cart = _orderService.GetCartById(cartId);
            _orderService.RemoveFromUserCart(cart);
            return View();
        }
        [HttpGet]
        public IActionResult Checkout()
        {
            byte[] userByte = _contextAccessor.HttpContext.Session.Get("user");
            int userId = int.Parse(Encoding.ASCII.GetString(userByte));
            List<Location> locations = _userService.GetLocations(userId);
            return View(locations);
        }
        [HttpPost]
        public IActionResult Checkout(int locationId)
        {
            byte[] userByte = _contextAccessor.HttpContext.Session.Get("user");
            int userId = int.Parse(Encoding.ASCII.GetString(userByte));
            double totalCost = _orderService.GetTotalOrderCost(userId);
            int orderId = _orderService.ProcessUserOrder(userId);
            _orderService.SendNotifications(orderId, locationId);
            _userService.UpdateUserBalance(userId, -totalCost);
            return View("PaymentCompletePage");
        }
        public IActionResult PaymentCompletePage()
        {
            return View();
        }
    }
}
