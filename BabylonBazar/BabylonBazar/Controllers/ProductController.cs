using BabylonBazar.DSL;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BabylonBazar.Controllers {
	public class ProductController:Controller {
		private ProductService _productService;

        public ProductController(ProductService productService)
        {
			_productService = productService;
        }
		public IActionResult Home(int page=0)
		{
			List<ProductHeadersVM> products = _productService.GetProducts(page);
			return View(products);
		}

		public IActionResult FilterByCategory(int id)
		{
			List <ProductHeadersVM> products = _productService.GetProductHeadersForCategory(id);
			return View(products);
		}

		public IActionResult ProductDetails(int id)
        {
			ProductDetailsVM product = _productService.GetProductDetails(id);
			return View(product);
        }

		public IActionResult FilterBySupplier(int id)
        {
			List <ProductHeadersVM> products = _productService.GetProductHeadersForSupplier(id);
			return View(products);
        }
		[HttpGet]
		public IActionResult EditProduct(int id)
        {
			ProductDetailsVM product = _productService.GetProductDetails(id);
			return View(product);
        }
		[HttpPost]
		public IActionResult EditProduct(Product product)
		{
			_productService.Update(product);
			return View("ProductDetails", product.Id); /*aaaaaaaaaaaaaaaaaaa*/
		}

		public IActionResult Search(string query)
        {
			throw new NotImplementedException();
        }
		//[EnableCors("Policy")]
		public JsonResult GetMainCategories()
        {
			return Json(_productService.GetMainCategories());
        } 
	}
}
