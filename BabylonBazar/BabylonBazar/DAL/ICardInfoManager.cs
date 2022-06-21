using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface ICardInfoManager: IBaseManager<CardInfo>
    {
        public IEnumerable<CardInfo> GetCardsForUser(int userId);
    }
}
