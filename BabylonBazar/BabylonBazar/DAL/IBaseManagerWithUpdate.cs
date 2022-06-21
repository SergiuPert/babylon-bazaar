namespace BabylonBazar.DAL
{
    public interface IBaseManagerWithUpdate<T>: IBaseManager<T>
    {
        public void Update(T item);
    }
}
