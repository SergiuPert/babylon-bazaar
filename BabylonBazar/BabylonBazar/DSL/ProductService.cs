using BabylonBazar.DAL;
using BabylonBazar.Models;
using BabylonBazar.ViewModels;
using System.Linq;

namespace BabylonBazar.DSL {
	public class ProductService {
		private IProductManager _productManager;
		private ICategoriesManager _categoriesManager;
		private IReviewsManager _reviewsManager;
		private IUserManager _userManager;
		private IImagesManager _imagesManager;
		private IProductCategoriesManager _productCategoriesManager;
		public ProductService(IProductManager productManager,ICategoriesManager categoriesManager,
			IReviewsManager reviewsManager,IUserManager userManager,IImagesManager imagesManager,
			IProductCategoriesManager productCategoriesManager) {
			_productManager=productManager;
			_categoriesManager=categoriesManager;
			_reviewsManager=reviewsManager;
			_userManager=userManager;
			_imagesManager=imagesManager;
			_productCategoriesManager=productCategoriesManager;
		}
		public ProductDetailsVM GetProductDetails(int productId) {
			ProductDetailsVM productDetails = new();
			productDetails.product=_productManager.GetById(productId);
			productDetails.supplier=_userManager.GetById(productDetails.product.UserId).Name;
			productDetails.images=_imagesManager.GetImagesForProduct(productId).ToList();
			productDetails.reviews=_reviewsManager.GetReviewsForProduct(productId).ToList();
			productDetails.rating=_reviewsManager.GetRatingForProduct(productId);
			productDetails.categories=_categoriesManager.GetCategoriesForProduct(productId).ToList();
			return productDetails;
		}
		public List<ProductHeadersVM> GetProductHeadersForCategory(int categoryId) {
			List<ProductHeadersVM> headers=new();
			List<ProductCategories> productCategoriess = _productCategoriesManager.GetProductsForCategory(categoryId).ToList();
			List<int> productIds = productCategoriess.Select(c => c.ProductId).ToList();
			List<Product> products = new();
			foreach(int productId in productIds) { products.Add(_productManager.GetById(productId)); }
			foreach(Product product in products) {
				List<Images> ProductImages=_imagesManager.GetImagesForProduct(product.Id).ToList();
				Images defaultImage = new() {Name="default",ProductId=0};
			ProductHeadersVM productHeaders = new();
				productHeaders.product=product;
				productHeaders.supplier=_userManager.GetById(product.UserId).Name;
				productHeaders.image=(ProductImages.Count==0)?defaultImage:ProductImages[0];
				productHeaders.rating=_reviewsManager.GetRatingForProduct(product.Id);
				productHeaders.categories=_categoriesManager.GetCategoriesForProduct(product.Id).ToList();
				headers.Add(productHeaders);
			}
			return headers;
		}
		public List<ProductHeadersVM> GetProductHeadersForSupplier(int supplierId) {
			List<ProductHeadersVM> headers = new();
			List<Product> products = _productManager.GetProductsBySupplier(supplierId).ToList();
			foreach(Product product in products) {
				ProductHeadersVM productHeaders = new();
				productHeaders.product=product;
				productHeaders.supplier=_userManager.GetById(supplierId).Name;
				var images = _imagesManager.GetImagesForProduct(product.Id);
				productHeaders.image=(images.Count()>0)?images.ToList()[0]:null;
				productHeaders.rating=_reviewsManager.GetRatingForProduct(product.Id);
				productHeaders.categories=_categoriesManager.GetCategoriesForProduct(product.Id).ToList();
				headers.Add(productHeaders);
			}
			return headers;
		}
		public List<ProductHeadersVM> GetProducts(int page)
        {
			List<ProductHeadersVM> headers = new();
			List<Product> products = _productManager.GetFirstXProducts(page).ToList();
			foreach (Product product in products)
            {
				ProductHeadersVM productHeaders = new();
				productHeaders.product = product;
				productHeaders.supplier = _userManager.GetById(product.UserId).Name;
				productHeaders.image = _imagesManager.GetImagesForProduct(product.Id).ToList()[0];
				productHeaders.rating = _reviewsManager.GetRatingForProduct(product.Id);
				productHeaders.categories = _categoriesManager.GetCategoriesForProduct(product.Id).ToList();
				headers.Add(productHeaders);
			}
			return headers;
        }
		public void Update(Product product)
        {
			_productManager.Update(product);
        }
		public Product GetProductById(int id)
        {
			return _productManager.GetById(id);
        }
		public List<Categories> GetCategoriesGroup(int id)
        {
			return _categoriesManager.GetCategoriesGroup(id).ToList();
        }
		public void AddProduct(Product product) {
			_productManager.Add(product);
		}
		public void DeleteProduct(int id) {
			_productManager.Remove(id);
			var images = _imagesManager.GetImagesForProduct(id);
			foreach(Images image in images) _imagesManager.Remove(image.Id);
			var categories = _productCategoriesManager.GetCategoriesForProduct(id);
			foreach(ProductCategories category in categories) _productCategoriesManager.Remove(category.Id);
		}
		public List<Images> GetProductImages(int id) {
			if(id==0) return null;
			return _imagesManager.GetImagesForProduct(id).ToList();
		}
		public void AddProductImage(Images image) {
			_imagesManager.Add(image);
		}
		public void DeleteProductImage(int id) {
			_imagesManager.Remove(id);
		}
		public void SetProductCategory(ProductCategories link) {
			_productCategoriesManager.Add(link);
		}
		public void DeleteProductCategory(int id) {
			_productCategoriesManager.Remove(id);
		}
	}
}
