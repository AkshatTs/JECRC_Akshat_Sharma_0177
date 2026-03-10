using Microsoft.EntityFrameworkCore;
using JwtRoleAuthAPI.Models;
using System.Reflection.Metadata;
namespace JwtRoleAuthAPI.Data{
    public class ApplicationDbContext : DbContext{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}