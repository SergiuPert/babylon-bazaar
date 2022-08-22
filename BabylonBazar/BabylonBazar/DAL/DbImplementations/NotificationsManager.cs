using BabylonBazar.Models;

namespace BabylonBazar.DAL {
	public class NotificationsManager:INotificationsManager {
		private readonly DbManager _dbManager;
		public NotificationsManager(DbManager dbManager) {
			_dbManager=dbManager;
		}
		public int Add(Notifications item) {
			_dbManager.Notifications.Add(item);
			_dbManager.SaveChanges();
			return item.Id;
		}

		public IEnumerable<Notifications> GetAll() {
			return _dbManager.Notifications;
		}

		public IEnumerable<Notifications> GetNotificationsByUser(int userId)
		{
			return _dbManager.Notifications.Where(n => n.UserId == userId);
		}
		public Notifications? GetById(int id) {
			return _dbManager.Notifications.FirstOrDefault(r => r.Id==id);
		}

		public void Remove(int id) {
			Notifications? existing = _dbManager.Notifications.FirstOrDefault(r => r.Id==id);
			if(existing is null) return;
			_dbManager.Notifications.Remove(existing);
			_dbManager.SaveChanges();
		}
		public void Update(Notifications item) {
			Notifications? existing = _dbManager.Notifications.FirstOrDefault(r => r.Id==item.Id);
			if(existing is null) return;
			existing.Completed=item.Completed;
			_dbManager.Notifications.Update(existing);
			_dbManager.SaveChanges();
		}
	}
}
