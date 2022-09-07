namespace BabylonBazar.Models
{
    public class PaymentRequest : BaseModel
    {
        public int UserId { get; set; }
        public int Sum { get; set; }
        public string IBAN { get; set; }
        public bool Status { get; set; }
    }
}
