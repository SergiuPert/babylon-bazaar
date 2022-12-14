using BabylonBazar.Models;

namespace BabylonBazar.DAL.DbImplementations {
	public class UserManager:IUserManager {
		private readonly DbManager _dbManager;
		public UserManager(DbManager dbmanager) {
			_dbManager=dbmanager;
		}
		public int Add(Users item) {
			_dbManager.Users.Add(item);
			_dbManager.SaveChanges();
			return item.Id;
		}

		public Users AddUser(Users user)
		{
			_dbManager.Users.Add(user);
			user.Id = _dbManager.SaveChanges();
			return user;
		}

		public Users? Login(string name, string password)
        {
			Users? existing = _dbManager.Users.FirstOrDefault(u => u.Name == name && u.Password == password);
			return existing;
        }
		public IEnumerable<Users> GetAll() {
			return _dbManager.Users;
		}

		public Users? GetById(int id) {
			return _dbManager.Users.FirstOrDefault(u => u.Id==id);
		}

		public void Remove(int id) {
			Users? user = _dbManager.Users.FirstOrDefault(o => o.Id==id);
			if(user is not null) {
				_dbManager.Users.Remove(user);
				_dbManager.SaveChanges();
			}
		}

		public void Update(Users item) {
			Users? existing = _dbManager.Users.FirstOrDefault(l => l.Id==item.Id);
			if(existing is null) return;
			existing.Name=item.Name;
			existing.Email=item.Email;
			existing.Password=item.Password;
			existing.Role=item.Role;
			existing.Balance=item.Balance;
			existing.Image=item.Image;
			_dbManager.Users.Update(existing);
			_dbManager.SaveChanges();
		}
	}
}
