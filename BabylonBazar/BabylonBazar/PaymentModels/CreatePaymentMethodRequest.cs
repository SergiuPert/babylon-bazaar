using Newtonsoft.Json;

namespace BabylonBazar.PaymentModels
{
    public class CreatePaymentMethodRequest
    {
        [JsonProperty("paymentMethodType")]
        public string PaymentMethodType { get; set; }
        [JsonProperty("currency")]
        public string Currency { get; set; }
    }
}
