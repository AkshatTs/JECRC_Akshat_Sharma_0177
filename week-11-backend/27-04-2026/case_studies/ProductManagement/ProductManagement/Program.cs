using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.Models;
using ProductManagement.Repositories.Implementations;
using ProductManagement.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Repository
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();

    // Seed categories if empty
    if (!context.CategoryDetails.Any())
    {
        context.CategoryDetails.AddRange(
            new Category { Name = "Electronics" },
            new Category { Name = "Clothing" },
            new Category { Name = "Books" },
            new Category { Name = "Home & Garden" },
            new Category { Name = "Sports" }
        );
        context.SaveChanges();
    }

    // Seed tags if empty
    if (!context.Tags.Any())
    {
        context.Tags.AddRange(
            new Tag { Name = "New" },
            new Tag { Name = "Sale" },
            new Tag { Name = "Popular" },
            new Tag { Name = "Trending" }
        );
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
