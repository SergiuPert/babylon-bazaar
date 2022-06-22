using BabylonBazar.Models;

namespace BabylonBazar.DAL {
	public interface INotificationsManager:IBaseManagerWithUpdate<Notifications> {
		public IEnumerable<Notifications> GetNotificationsByUser(int userId);
	}
}
