using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BillGeneratorAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DiscountType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TaxRate = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false),
                    DraftSavedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CatalogType = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillId = table.Column<int>(type: "int", nullable: false),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Catalog = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillItems_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CatalogItems",
                columns: new[] { "Id", "CatalogType", "Category", "CreatedDate", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "entrance", "Entrance Fee", new DateTime(2026, 4, 4, 14, 29, 27, 372, DateTimeKind.Local).AddTicks(6426), "Adult", 50m },
                    { 2, "entrance", "Entrance Fee", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7076), "Child", 25m },
                    { 3, "entrance", "Entrance Fee", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7105), "Senior", 30m },
                    { 4, "entrance", "Entrance Fee", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7111), "VIP", 100m },
                    { 5, "donation", "Donation", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7116), "Small Donation", 100m },
                    { 6, "donation", "Donation", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7120), "Medium Donation", 500m },
                    { 7, "donation", "Donation", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7125), "Large Donation", 1000m },
                    { 8, "selling", "Merchandise", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7129), "T-Shirt", 200m },
                    { 9, "selling", "Merchandise", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7134), "Cap", 150m },
                    { 10, "selling", "Food & Beverage", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7138), "Water Bottle", 100m },
                    { 11, "selling", "Food & Beverage", new DateTime(2026, 4, 4, 14, 29, 27, 375, DateTimeKind.Local).AddTicks(7142), "Snacks", 50m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_BillId",
                table: "BillItems",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_CreatedDate",
                table: "Bills",
                column: "CreatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_InvoiceNumber",
                table: "Bills",
                column: "InvoiceNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CatalogItems_CatalogType",
                table: "CatalogItems",
                column: "CatalogType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillItems");

            migrationBuilder.DropTable(
                name: "CatalogItems");

            migrationBuilder.DropTable(
                name: "Bills");
        }
    }
}
