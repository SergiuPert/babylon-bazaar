using BabylonBazar.DSL;
using BabylonBazar.Dtos;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BabylonBazar.Controllers {
	public class ProductController:Controller {
		private ProductService _productService;
		private JwtService _jwtService;
		private UserService _userService;


		public ProductController(ProductService productService, JwtService jwtService, UserService userService)
        {
			_productService = productService;
			_jwtService = jwtService;
			_userService = userService;
        }
		[EnableCors("Policy")]
		public JsonResult FilterByCategory([FromRoute]int id, [FromQuery] int page)
		{
			List <ProductHeadersVM> products = _productService.GetProductHeadersForCategory(id, page);
			return Json(products);
		}

		[EnableCors("Policy")]
		public JsonResult ProductDetails(int id)
        {
			ProductDetailsVM product = _productService.GetProductDetails(id);
			return Json(product);
        }

		public JsonResult FilterBySupplier(int id)
        {
			List <ProductHeadersVM> products = _productService.GetProductHeadersForSupplier(id);
			return Json(products);
        }
		[HttpPost]
		public IActionResult EditProduct([FromBody]Product product)
		{
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				int userId = int.Parse(token.Issuer);
				var user = _userService.Get(userId);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
			_productService.Update(product);
			return Ok(new { message = "success" });
		}
        [EnableCors("Policy")]
        public JsonResult GetCategoriesGroup(int id=0)
        {
			return Json(_productService.GetCategoriesGroup(id));
        }
		[EnableCors("Policy")]
		public JsonResult GetProductImages(int id = 0) {
			List<Images> images = _productService.GetProductImages(id);
			if (images == null)
            {
				images = new List<Images>();
            }
			return Json(images);
		}
		[HttpPost]
		public IActionResult AddProduct([FromBody] ProductDto data) {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}

			Product product = new();
			product.Aproved = false;
			product.UserId = data.UserId;
			product.Name = data.Name;
			product.Description = data.Description;
			product.Price = data.Price;
			int productId = _productService.AddProduct(product);
			ProductCategories productCategories = new ProductCategories();
			productCategories.ProductId = productId;
			productCategories.CategoryId = data.SubSubCategoryId;
			_productService.SetProductCategory(productCategories);
			return Ok(new { message = "success" });
		}
		//[HttpPost]
		//public IActionResult DeleteProduct([FromRoute] int id) {
		//	int userId = -1;
		//	try
		//	{
		//		var jwt = Request.Cookies["jwt"];
		//		var token = _jwtService.Verify(jwt);
		//		userId = int.Parse(token.Issuer);
		//	}
		//	catch (Exception ex)
		//	{
		//		return Unauthorized();
		//	}

		//	_productService.DeleteProductCategory(id);
		//	List<Images> images = _productService.GetProductImages(id).ToList();
		//	foreach (Images image in images) 
		//	{
		//		_productService.DeleteProductImage(image.Id);
		//	}
		//	List<Reviews> reviews = _productService.GetProductRatings(id);
		//	foreach (Reviews review in reviews)
        //    {
		//		_productService.RemoveProductReview(review.Id);
        //    }
		//	_productService.DeleteProduct(id);
		//	return Ok();
		//}
		//Products should not be deleted in order to maintain an order history


		[HttpPost]
		public IActionResult AddProductImage([FromBody] Images image) {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}

			_productService.AddProductImage(image);
			return Ok(new { message = "success" });
		}
		[HttpPost]
		public IActionResult DeleteProductImage([FromRoute] int id) {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}

			_productService.DeleteProductImage(id);
			return Ok();
		}

		[HttpPost]
		public IActionResult AddProductReview([FromBody] ReviewDto review)
        {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}

			Reviews newReview = new Reviews();
			newReview.ProductId = review.ProductId;
			newReview.Comment = review.Comment;
			newReview.Rating = review.Rating;
			newReview.UserId = userId;
			_productService.AddProductReview(newReview);
			return Ok();
        }

		[HttpPost]
		public IActionResult RemoveProductReview(int id) {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
			_productService.RemoveProductReview(id);
			return Ok();
		}

		[HttpGet]
		public JsonResult GetAllProducts([FromRoute]int page)
        {
			List<ProductHeadersVM> products = _productService.GetAllProducts(page);
			return Json(products);
        }
		[HttpPost]
		public IActionResult SwitchApproval(int id)
        {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
			_productService.SwitchApproval(id);
			return Ok();
        }

		[HttpPost]
		public IActionResult AddCategory([FromRoute] int id)
        {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
			var nameObject = Request.Query["name"];
			_productService.AddCategory( nameObject, id);
			return Ok();
        }

		[HttpGet]
		public JsonResult GetPaymentRequests()
        {
			List<PaymentRequestVM> requests = _productService.GetPaymentRequests();
			return Json(requests);
        }


		[HttpPost]
		public IActionResult AddPaymentRequest([FromBody] PaymentRequestDto paymentRequest)
        {
			PaymentRequest item = new PaymentRequest();
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}

			item.UserId = userId;
			item.Sum = paymentRequest.Sum;
			item.IBAN = paymentRequest.IBAN;
			item.Status = false;
			_productService.AddPaymentRequest(item);
			return Ok();
		}


		[HttpPost]
		public IActionResult CompletePaymentRequest([FromRoute] int id)
        {
			int userId = -1;
			try
			{
				var jwt = Request.Cookies["jwt"];
				var token = _jwtService.Verify(jwt);
				userId = int.Parse(token.Issuer);
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
			_productService.CompletePaymentRequest(id);
			return Ok();
        }
	}
}
