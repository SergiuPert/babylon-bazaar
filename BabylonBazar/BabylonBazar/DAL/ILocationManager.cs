using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public interface ILocationManager: IBaseManagerWithUpdate<Location>
    {
        public IEnumerable<Location> GetLocationsForUser(int userId);
    }
}
