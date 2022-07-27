using BabylonBazar.Models;

namespace BabylonBazar.DAL {
	public interface IUserManager :IBaseManagerWithUpdate<Users> {

		public Users AddUser(Users user);
		
		public Users? Login(string name, string password);
	}
}
