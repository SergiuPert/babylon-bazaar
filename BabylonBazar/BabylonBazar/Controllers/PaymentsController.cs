using BabylonBazar.Configuration;
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
        public PaymentsController(IOptions<StripeOptions> options)
        {
            _options = options;
            _client = new StripeClient(_options.Value.SecretKey);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentMethodRequest req)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = 1999,
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

        [HttpPost]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    _options.Value.WebhookSecret
                    );
                Console.WriteLine("ffffff" + stripeEvent.Type);
            }
            catch (Exception e)
            {
                Console.WriteLine("fail 1" + e);
                return BadRequest();
            }

            if (stripeEvent.Type == "payment_intent.created")
            {
                var paymentIntent = stripeEvent.Data.Object as Stripe.PaymentIntent;
                Console.WriteLine("PaymentIntent created!");
            }
            return Ok();
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
