using BabylonBazar.Models;

namespace BabylonBazar.DAL.DbImplementations
{
    public class PaymentRequestManager : IPaymentRequestManager
    {
        private readonly DbManager _dbManager;
        public PaymentRequestManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public int Add(PaymentRequest item)
        {
            _dbManager.Add(item);
            _dbManager.SaveChanges();
            return item.Id;
        }

        public IEnumerable<PaymentRequest> GetAll()
        {
            return _dbManager.PaymentRequests.OrderBy(p => p.Status);
        }

        public PaymentRequest? GetById(int id)
        {
            return _dbManager.PaymentRequests.FirstOrDefault(p => p.Id == id);
        }

        public void Remove(int id)
        {
            PaymentRequest item = _dbManager.PaymentRequests.FirstOrDefault(p => p.Id == id);
            if (item != null)
            {
                _dbManager.PaymentRequests.Remove(item);
                _dbManager.SaveChanges();
            }
        }

        public void Update(PaymentRequest item)
        {
            PaymentRequest request = _dbManager.PaymentRequests.FirstOrDefault(p => p.Id == item.Id);
            if (request != null)
            {
                request.Status = item.Status;
                _dbManager.PaymentRequests.Update(request);
                _dbManager.SaveChanges();
            }
        }
    }
}
