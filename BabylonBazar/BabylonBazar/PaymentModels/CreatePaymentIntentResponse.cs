using Newtonsoft.Json;

namespace BabylonBazar.PaymentModels
{
    public class CreatePaymentIntentResponse
    {
        [JsonProperty ("clientSecret")]
        public string ClientSecret { get; set; }
    }
}
