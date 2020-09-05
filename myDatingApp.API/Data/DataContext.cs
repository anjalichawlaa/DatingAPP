using Microsoft.EntityFrameworkCore;
using myDatingApp.API.Models;
namespace myDatingApp.API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {

        }

        public DbSet<Value> Values{get;set;}
    }
}