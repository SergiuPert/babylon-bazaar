using BabylonBazar.Models;

namespace BabylonBazar.DAL
{
    public class CategoriesManager : ICategoriesManager
    {
        private readonly DbManager _dbManager;
        public CategoriesManager(DbManager dbManager)
        {
            _dbManager = dbManager;
        }
        public void Add(Categories item)
        {
            _dbManager.Categories.Add(item);
            _dbManager.SaveChanges();
        }

        public IEnumerable<Categories> GetAll()
        {
            return _dbManager.Categories;
        }

        public Categories? GetById(int id)
        {
            return _dbManager.Categories.FirstOrDefault(c => c.Id == id);
        }

        public void Remove(int id)
        {
            Categories? existing = _dbManager.Categories.FirstOrDefault(c => c.Id == id);
            if (existing is null) return;
            _dbManager.Categories.Remove(existing);
            _dbManager.SaveChanges();
        }

        public void Update(Categories item)
        {
            Categories? existing = _dbManager.Categories.FirstOrDefault(c => c.Id == item.Id);
            if (existing is null) return;
            existing.Name=item.Name;
            existing.ParentId=item.ParentId;
            _dbManager.Categories.Update(existing);
            _dbManager.SaveChanges();
        }
    }
}
