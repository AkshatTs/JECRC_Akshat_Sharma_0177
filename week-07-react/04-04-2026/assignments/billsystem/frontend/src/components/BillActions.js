import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import '../styles/components.css';

function BillActions({ onSaveBill, onSaveDraft, onReset, items }) {
  const handlePrint = () => {
    window.print();
  };

  const handlePDFDownload = async () => {
    try {
      const element = document.querySelector('.invoice-section');
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('bill.pdf');
    } catch (error) {
      console.error('PDF download error:', error);
    }
  };

  const handleCSVExport = () => {
    if (items.length === 0) return;

    const csvData = items.map(item => ({
      'Item Name': item.name,
      'Category': item.category,
      'Price': item.price,
      'Quantity': item.quantity,
      'Amount': item.price * item.quantity
    }));

    const csv = Papa.unparse(csvData);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `bill-${Date.now()}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bill-actions">
      <button className="btn-save" onClick={onSaveBill}>
        💾 Save Bill
      </button>
      <button className="btn-draft" onClick={onSaveDraft} disabled={items.length === 0}>
        📝 Save Draft
      </button>
      <button className="btn-print" onClick={handlePrint} disabled={items.length === 0}>
        🖨️ Print
      </button>
      <button className="btn-pdf" onClick={handlePDFDownload} disabled={items.length === 0}>
        📄 PDF
      </button>
      <button className="btn-csv" onClick={handleCSVExport} disabled={items.length === 0}>
        📊 CSV
      </button>
      <button className="btn-reset" onClick={onReset}>
        🔄 Reset
      </button>
    </div>
  );
}

export default BillActions;
