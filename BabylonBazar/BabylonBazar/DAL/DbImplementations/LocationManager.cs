using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class LocationManager : ILocationManager
    {
        private readonly DbManager _dbManager;
        public LocationManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(Location item)
        {
            _dbManager.Location.Add(item);
            _dbManager.SaveChanges();
        }

        public IEnumerable<Location> GetAll()
        {
            Console.WriteLine("Nah Brah");
            IEnumerable<Location> result = new List<Location>();
            return result;
        }

        public Location? GetById(int id)
        {
            Console.WriteLine("Nah Brah");
            Location result = new Location();
            return result;
        }

        public IEnumerable<Location> GetLocationsForUser(int userId)
        {
            return _dbManager.Location.Where(l => l.UserId == userId);
        }

        public void Remove(int id)
        {
            Location? existing = _dbManager.Location.FirstOrDefault(l => l.Id == id);
            if (existing is null) return;
            _dbManager.Location.Remove(existing);
            _dbManager.SaveChanges();
        }

        public void Update(Location item)
        {
            Location? existing = _dbManager.Location.FirstOrDefault(l => l.Id == item.Id);
            if (existing is null) return;
            existing.AddresLine1 = item.AddresLine1;
            existing.AddresLine2 = item.AddresLine2;
            existing.PhoneNumber = item.PhoneNumber;
            existing.Email = item.Email;
            existing.Country = item.Country;
            existing.County = item.County;
            existing.City = item.City;
            existing.ZipCode = item.ZipCode;
            _dbManager.Location.Update(existing);
            _dbManager.SaveChanges();
        }
    }
}
