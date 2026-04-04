# Multi-Catalog Bill Generator System

A comprehensive billing system with support for multiple catalogs (entrance fees, donations, selling items) and advanced features like automatic tax calculation, discount handling, PDF export, and daily sales reporting.

## Features

### 1. Multi-Catalog Management
- **Entrance Fee Catalog**: Pre-defined entry tickets (Adult, Child, Senior, VIP)
- **Donation Catalog**: Pre-set amounts with custom donation option
- **Selling Price Catalog**: Products with variable pricing (merchandise, food, services)
- **Custom Items**: Ability to add completely custom items not in catalogs

### 2. Bill/Invoice Operations
- Create new bills from any catalog
- Add/delete items dynamically
- Edit quantities and prices on the fly
- Apply discounts (percentage or fixed amount)
- Calculate taxes automatically
- Generate unique invoice numbers
- Track date and time of each transaction

### 3. User Experience
- Seamlessly switch between catalogs
- Real-time total calculation
- Print-friendly invoice layout
- Save/load draft bills
- Search and filter past bills by date and invoice number
- Responsive design (works on tablet for on-site billing)

### 4. Data Management
- Local storage persistence for offline functionality
- Export bills as PDF or CSV
- Daily sales summary dashboard
- Catalog item management (add/edit/delete products)
- Complete bill history with filtering

## Technology Stack

### Frontend
- **React 18**: UI framework
- **React Router**: Navigation
- **Axios**: HTTP client
- **jsPDF & html2canvas**: PDF generation
- **PapaParse**: CSV export
- **React Toastify**: Notifications
- **CSS3**: Pink/Magenta theme with responsive design

### Backend
- **.NET 6.0**: Web API framework
- **Entity Framework Core**: ORM
- **SQL Server/SQL Express**: Database
- **Swagger/OpenAPI**: API documentation

## Project Structure

```
billsystem/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BillItemSelector.js
│   │   │   ├── BillItemList.js
│   │   │   ├── BillCalculations.js
│   │   │   └── BillActions.js
│   │   ├── pages/
│   │   │   ├── BillCreator.js
│   │   │   ├── CatalogManagement.js
│   │   │   ├── BillHistory.js
│   │   │   └── Dashboard.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── components.css
│   │   │   ├── BillCreator.css
│   │   │   ├── CatalogManagement.css
│   │   │   ├── BillHistory.css
│   │   │   └── Dashboard.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── BillGeneratorAPI/
│   │   ├── Models/
│   │   │   └── Bill.cs
│   │   ├── Data/
│   │   │   └── BillGeneratorDbContext.cs
│   │   ├── Controllers/
│   │   │   ├── BillsController.cs
│   │   │   └── CatalogsController.cs
│   │   ├── Services/
│   │   │   ├── BillService.cs
│   │   │   └── CatalogService.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   ├── BillGeneratorAPI.csproj
│   │   └── Properties/
│   │       └── launchSettings.json
│   └── README.md
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- .NET 6.0 SDK
- SQL Server or SQL Express
- Visual Studio 2022 (recommended) or VS Code

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd d:\billsystem\frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=https://localhost:7160/api
```

4. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd d:\billsystem\backend\BillGeneratorAPI
```

2. Update the database connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=BillGeneratorDb;Trusted_Connection=true;"
  }
}
```

3. Create and migrate the database:
```bash
dotnet ef database update
```

4. Run the API server:
```bash
dotnet run
```

The API will start at `https://localhost:7160`

API documentation will be available at: `https://localhost:7160/swagger`

## API Endpoints

### Bills
- `GET /api/bills` - Get all bills
- `GET /api/bills/{id}` - Get bill by ID
- `POST /api/bills` - Create new bill
- `PUT /api/bills/{id}` - Update bill
- `DELETE /api/bills/{id}` - Delete bill
- `GET /api/bills/search/{invoiceNumber}` - Search bills
- `GET /api/bills/date-range?startDate=&endDate=` - Get bills by date range
- `GET /api/bills/daily-report/{date}` - Get daily sales report
- `POST /api/bills/draft` - Save draft bill
- `GET /api/bills/drafts/all` - Get all draft bills
- `DELETE /api/bills/draft/{id}` - Delete draft bill

### Catalogs
- `GET /api/catalogs` - Get all catalog items
- `GET /api/catalogs/type/{catalogType}` - Get items by catalog type
- `GET /api/catalogs/{id}` - Get catalog item by ID
- `POST /api/catalogs` - Create new catalog item
- `PUT /api/catalogs/{id}` - Update catalog item
- `DELETE /api/catalogs/{id}` - Delete catalog item

## Styling Guidelines

The application uses a pink/magenta theme with the following color scheme:
- **Primary**: `#d946ef` (Magenta)
- **Secondary**: `#f472b6` (Pink)
- **Accent**: `#fbcfe8` (Light Pink)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)

CSS is modular and organized by component with:
- Smooth transitions and hover effects
- Responsive grid layouts
- Accessible form inputs
- Print-friendly styles
- Mobile-first design approach

## Usage Examples

### Creating a Bill
1. Navigate to "Create Bill"
2. Select items from catalogs
3. Adjust quantities as needed
4. Apply discount if required
5. Modify tax rate if needed
6. Click "Save Bill" to finalize

### Managing Catalogs
1. Go to "Manage Catalogs"
2. Select catalog type (Entrance, Donation, Selling)
3. Add new items with name and price
4. Edit or delete existing items

### Viewing Reports
1. Dashboard shows real-time statistics
2. View top-selling items
3. Today's revenue and bill count

### Exporting Data
- Click "PDF" to download bills as PDF
- Click "CSV" to export for spreadsheet analysis
- Use "Export All" to backup all bills

## Key Features Implemented

✅ Multi-catalog system with predefined items
✅ Real-time calculations (subtotal, discount, tax, total)
✅ Multiple discount types (percentage and fixed)
✅ Dynamic tax rate adjustment
✅ Invoice number generation
✅ Bill history and search functionality
✅ Draft bills (save and restore)
✅ PDF and CSV export
✅ Print-friendly layout
✅ Daily sales dashboard
✅ Catalog management interface
✅ Pink/Magenta responsive theme
✅ Local storage persistence
✅ Date-based filtering
✅ Top items analytics

## Database Schema

### Bills Table
- Id (PK)
- InvoiceNumber (Unique)
- CreatedDate
- Subtotal
- DiscountAmount
- DiscountType
- DiscountValue
- TaxRate
- TaxAmount
- Total
- IsDraft
- DraftSavedDate

### BillItems Table
- Id (PK)
- BillId (FK)
- ItemName
- Price
- Quantity
- Category
- Catalog

### CatalogItems Table
- Id (PK)
- Name
- Price
- Category
- CatalogType (entrance, donation, selling)
- CreatedDate

## Performance Considerations

- Async/await used throughout for non-blocking operations
- Entity Framework lazy loading configured
- Indexes on frequently queried columns
- Pagination can be added for large datasets
- Local storage caching on frontend

## Security Considerations

- CORS configured for development
- Input validation on all endpoints
- SQL injection prevention via EF Core
- Consider adding authentication for production

## Future Enhancements

- User authentication and roles
- Multi-user support with user profiles
- Advanced reporting and analytics
- Email receipt functionality
- Integration with payment gateways
- Mobile app for on-site billing
- QR code generation for bills
- Inventory management
- Barcode scanning support
- Cloud backup functionality

## Troubleshooting

### Frontend Issues
- Clear browser cache and localStorage if data persists incorrectly
- Check browser console for API errors
- Verify `REACT_APP_API_URL` in .env file

### Backend Issues
- Ensure SQL Server is running
- Check connection string in appsettings.json
- Verify database migrations ran successfully
- Check logs in console for detailed errors

### CORS Issues
- Frontend and backend running on different ports
- Ensure `AllowReactApp` CORS policy is configured

## Support & Documentation

- Swagger API documentation: `https://localhost:7160/swagger`
- React component documentation in code comments
- Entity relationships defined in DbContext

---

**Created**: 2024
**Version**: 1.0.0
**Theme**: Pink/Magenta Modern UI
