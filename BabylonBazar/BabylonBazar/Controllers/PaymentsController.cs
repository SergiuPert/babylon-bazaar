using BabylonBazar.Configuration;
using BabylonBazar.DSL;
using BabylonBazar.PaymentModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

namespace BabylonBazar.Controllers
{
    public class PaymentsController : Controller
    {
        private readonly IOptions<StripeOptions> _options;
        private readonly IStripeClient _client;
        private readonly JwtService _jwtService;
        public PaymentsController(IOptions<StripeOptions> options, JwtService jwtService)
        {
            _options = options;
            _client = new StripeClient(_options.Value.SecretKey);
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentMethodRequest req)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = req.Amount,
                Currency = req.Currency,
                PaymentMethodTypes = new List<string>
                {
                    req.PaymentMethodType,
                }
                //Currency = "USD",
                //PaymentMethodTypes = new List<string> { "card"}
            };
            var service = new PaymentIntentService(_client);
            try
            {
                var paymentIntent = await service.CreateAsync(options);

                return Ok(new CreatePaymentIntentResponse
                {
                    ClientSecret = paymentIntent.ClientSecret
                });
            } 
            catch (Stripe.StripeException ex)
            {
                return BadRequest(new
                {
                    Error = new
                    {
                        Message = ex.Message,
                    }
                });
            }
            
        }

        [HttpGet]
        public ActionResult<PublicKeyResponse> GetPublicKeys()
        {
            return new PublicKeyResponse
            {
                PublicKey = _options.Value.PublishableKey
            };
        }
    }
}
