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
		private IPaymentRequestManager _paymentRequestManager;
		public ProductService(IProductManager productManager,ICategoriesManager categoriesManager,
			IReviewsManager reviewsManager,IUserManager userManager,IImagesManager imagesManager,
			IProductCategoriesManager productCategoriesManager, IPaymentRequestManager paymentRequestManager) {
			_productManager=productManager;
			_categoriesManager=categoriesManager;
			_reviewsManager=reviewsManager;
			_userManager=userManager;
			_imagesManager=imagesManager;
			_productCategoriesManager=productCategoriesManager;
			_paymentRequestManager=paymentRequestManager;
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
		public List<Reviews> GetProductRatings(int id)
        {
			return _reviewsManager.GetAllRatingsForProduct(id).ToList();
        }
		public List<ProductHeadersVM> GetProductHeadersForCategory(int categoryId, int page) {
			List<ProductHeadersVM> headers=new();
			List<ProductCategories> productCategoriess = _productCategoriesManager.GetProductsForCategory(categoryId).ToList();
			List<int> productIds = productCategoriess.Select(c => c.ProductId).ToList();
			List<Product> products = new();
			foreach(int productId in productIds) {
				Product? product = _productManager.GetById(productId);
				if (product is not null && product.Aproved)
                {
					products.Add(product);
				}
			}
			int pagination = 12;
			int pages = (int)((products.Count() - 0.000001) / pagination);
			products = products.Skip(page * pagination).Take(pagination).ToList();
			foreach (Product product in products) {
				List<Images> ProductImages=_imagesManager.GetImagesForProduct(product.Id).ToList();
				Images defaultImage = new() {Name="default",ProductId=0};
			ProductHeadersVM productHeaders = new();
				productHeaders.product=product;
				productHeaders.supplier=_userManager.GetById(product.UserId).Name;
				productHeaders.image=(ProductImages.Count==0)?defaultImage:ProductImages[0];
				productHeaders.rating=_reviewsManager.GetRatingForProduct(product.Id);
				productHeaders.categories=_categoriesManager.GetCategoriesForProduct(product.Id).ToList()[0];
				productHeaders.pages = pages;
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
				productHeaders.categories=_categoriesManager.GetCategoriesForProduct(product.Id).ToList()[0];
				headers.Add(productHeaders);
			}
			return headers;
		}
		public List<ProductHeadersVM> GetApprovedProducts(int page)
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
				productHeaders.categories = _categoriesManager.GetCategoriesForProduct(product.Id).ToList()[0];
				headers.Add(productHeaders);
			}
			return headers; //NOT USED
        }

		public List<ProductHeadersVM> GetAllProducts(int page)
		{
			List<ProductHeadersVM> headers = new();
			var productsAndPages = _productManager.GetAllProducts(page);
			List<Product> products = productsAndPages.Item1.ToList();
			int pages = productsAndPages.Item2;
			foreach (Product product in products)
			{
				ProductHeadersVM productHeaders = new();
				productHeaders.product = product;
				productHeaders.supplier = _userManager.GetById(product.UserId).Name;
				var images = _imagesManager.GetImagesForProduct(product.Id).ToList();
				productHeaders.image = (images.Count > 0)? images[0] : null;
				productHeaders.rating = _reviewsManager.GetRatingForProduct(product.Id);
				productHeaders.categories = _categoriesManager.GetCategoriesForProduct(product.Id).ToList()[0];
				productHeaders.pages = pages;
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
		public int AddProduct(Product product) {
			int id = _productManager.Add(product);
			return id;
		}
		public void DeleteProduct(int id) {
			_productManager.Remove(id);
			//var images = _imagesManager.GetImagesForProduct(id);
			//foreach(Images image in images) _imagesManager.Remove(image.Id);
			//var categories = _productCategoriesManager.GetCategoriesForProduct(id);
			//foreach(ProductCategories category in categories) _productCategoriesManager.Remove(category.Id);
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

		public void AddProductReview(Reviews review) { 
			_reviewsManager.Add(review);
		}

		public void RemoveProductReview(int id){
			_reviewsManager.Remove(id);
		}

		public void SwitchApproval(int id)
        {
			_productManager.SwitchApproval(id);
        }

		public void AddCategory(string name, int id=0)
        {
			Categories categories = new Categories();
			categories.Name = name;
			categories.ParentId = id;
			_categoriesManager.Add(categories);
        }

		public List<PaymentRequestVM> GetPaymentRequests() 
		{
			List<PaymentRequest> paymentRequests = _paymentRequestManager.GetAll().ToList();
			List<PaymentRequestVM> result = new List<PaymentRequestVM>();
			foreach (PaymentRequest paymentRequest in paymentRequests)
            {
				PaymentRequestVM paymentRequestVM = new PaymentRequestVM();
				paymentRequestVM.Request = paymentRequest;
				paymentRequestVM.Username = _userManager.GetById(paymentRequest.UserId).Name;
				result.Add(paymentRequestVM);
            }
			return result;
		}


		public void AddPaymentRequest(PaymentRequest paymentRequest)
        {
			_paymentRequestManager.Add(paymentRequest);
			Users user = _userManager.GetById(paymentRequest.UserId);
			user.Balance -= paymentRequest.Sum;
			_userManager.Update(user);
		}

		public void CompletePaymentRequest(int id)
        {
			PaymentRequest? request = _paymentRequestManager.GetById(id);
			if (request == null) return;
			request.Status = true;
			_paymentRequestManager.Update(request);
        }
	}
}
