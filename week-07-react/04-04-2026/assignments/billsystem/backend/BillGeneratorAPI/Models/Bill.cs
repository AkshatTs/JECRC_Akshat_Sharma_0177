namespace BillGeneratorAPI.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public decimal Subtotal { get; set; }
        public decimal DiscountAmount { get; set; }
        public string DiscountType { get; set; } = "none"; // none, percentage, fixed
        public decimal DiscountValue { get; set; }
        public decimal TaxRate { get; set; } = 18;
        public decimal TaxAmount { get; set; }
        public decimal Total { get; set; }
        public bool IsDraft { get; set; } = false;
        public DateTime? DraftSavedDate { get; set; }
        
        public List<BillItem> Items { get; set; } = new List<BillItem>();
    }

    public class BillItem
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Catalog { get; set; } = "custom";
        
        public Bill? Bill { get; set; }
    }

    public class CatalogItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public string CatalogType { get; set; } = string.Empty; // entrance, donation, selling
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }

    public class DailySalesReport
    {
        public DateTime Date { get; set; }
        public int BillCount { get; set; }
        public int ItemCount { get; set; }
        public decimal TotalSales { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal TotalTax { get; set; }
    }

    public class SalesFilter
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IncludeDrafts { get; set; } = false;
    }
}
