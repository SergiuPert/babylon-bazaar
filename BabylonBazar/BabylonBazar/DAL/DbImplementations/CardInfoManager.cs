using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class CardInfoManager : ICardInfoManager
    {
        private readonly DbManager _dbManager;
        public CardInfoManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(CardInfo item)
        {
            _dbManager.CardInfo.Add(item);
            _dbManager.SaveChanges();
        }

        public IEnumerable<CardInfo> GetAll()
        {
            Console.WriteLine("Nah brah");
            IEnumerable<CardInfo> list = new List<CardInfo>();
            return list;
        }

        public CardInfo? GetById(int id)
        {
            Console.WriteLine("Naaah Brah");
            CardInfo cardInfo = new CardInfo();
            return cardInfo;
        }

        public IEnumerable<CardInfo> GetCardsForUser(int userId)
        {
            return _dbManager.CardInfo.Where(c => c.UserId == userId);
        }

        public void Remove(int id)
        {
            CardInfo? cardInfo = _dbManager.CardInfo.FirstOrDefault(c => c.Id == id);
            if (cardInfo is null) return;
            _dbManager.CardInfo.Remove(cardInfo);
            _dbManager.SaveChanges();
        }
    }
}
