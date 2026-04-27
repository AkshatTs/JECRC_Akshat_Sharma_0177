using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using BillGeneratorAPI.Models;

namespace BillGeneratorAPI.Data
{
    public class BillGeneratorDbContext : DbContext
    {
        public BillGeneratorDbContext(DbContextOptions<BillGeneratorDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bill> Bills { get; set; } = null!;
        public DbSet<BillItem> BillItems { get; set; } = null!;
        public DbSet<CatalogItem> CatalogItems { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Log(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // -------------------------------
            // 🔥 DECIMAL PRECISION FIX
            // -------------------------------

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.Property(e => e.DiscountAmount).HasPrecision(18, 2);
                entity.Property(e => e.DiscountValue).HasPrecision(18, 2);
                entity.Property(e => e.Subtotal).HasPrecision(18, 2);
                entity.Property(e => e.TaxAmount).HasPrecision(18, 2);
                entity.Property(e => e.TaxRate).HasPrecision(5, 2);
                entity.Property(e => e.Total).HasPrecision(18, 2);
            });

            modelBuilder.Entity<BillItem>(entity =>
            {
                entity.Property(e => e.Price).HasPrecision(18, 2);
            });

            modelBuilder.Entity<CatalogItem>(entity =>
            {
                entity.Property(e => e.Price).HasPrecision(18, 2);
            });

            // -------------------------------
            // EXISTING CONFIG (UNCHANGED)
            // -------------------------------

            modelBuilder.Entity<Bill>()
                .HasMany(b => b.Items)
                .WithOne(bi => bi.Bill)
                .HasForeignKey(bi => bi.BillId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Bill>()
                .HasIndex(b => b.InvoiceNumber)
                .IsUnique();

            modelBuilder.Entity<Bill>()
                .HasIndex(b => b.CreatedDate);

            modelBuilder.Entity<BillItem>()
                .HasIndex(bi => bi.BillId);

            modelBuilder.Entity<CatalogItem>()
                .HasIndex(ci => ci.CatalogType);

            // Seed data
            SeedInitialData(modelBuilder);
        }

        private void SeedInitialData(ModelBuilder modelBuilder)
        {
            var entranceCatalogItems = new[]
            {
                new CatalogItem { Id = 1, Name = "Adult", Price = 50, Category = "Entrance Fee", CatalogType = "entrance" },
                new CatalogItem { Id = 2, Name = "Child", Price = 25, Category = "Entrance Fee", CatalogType = "entrance" },
                new CatalogItem { Id = 3, Name = "Senior", Price = 30, Category = "Entrance Fee", CatalogType = "entrance" },
                new CatalogItem { Id = 4, Name = "VIP", Price = 100, Category = "Entrance Fee", CatalogType = "entrance" }
            };

            var donationCatalogItems = new[]
            {
                new CatalogItem { Id = 5, Name = "Small Donation", Price = 100, Category = "Donation", CatalogType = "donation" },
                new CatalogItem { Id = 6, Name = "Medium Donation", Price = 500, Category = "Donation", CatalogType = "donation" },
                new CatalogItem { Id = 7, Name = "Large Donation", Price = 1000, Category = "Donation", CatalogType = "donation" }
            };

            var sellingCatalogItems = new[]
            {
                new CatalogItem { Id = 8, Name = "T-Shirt", Price = 200, Category = "Merchandise", CatalogType = "selling" },
                new CatalogItem { Id = 9, Name = "Cap", Price = 150, Category = "Merchandise", CatalogType = "selling" },
                new CatalogItem { Id = 10, Name = "Water Bottle", Price = 100, Category = "Food & Beverage", CatalogType = "selling" },
                new CatalogItem { Id = 11, Name = "Snacks", Price = 50, Category = "Food & Beverage", CatalogType = "selling" }
            };

            modelBuilder.Entity<CatalogItem>().HasData(entranceCatalogItems);
            modelBuilder.Entity<CatalogItem>().HasData(donationCatalogItems);
            modelBuilder.Entity<CatalogItem>().HasData(sellingCatalogItems);
        }
    }
}