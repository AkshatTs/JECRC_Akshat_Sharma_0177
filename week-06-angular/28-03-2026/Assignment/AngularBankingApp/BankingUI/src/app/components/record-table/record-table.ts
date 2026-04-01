import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-table.html',
  styleUrl: './record-table.css'
})
export class RecordTableComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedDate: string = '';

  transaction: Transaction = {
    date: '',
    description: '',
    type: 0,
    amount: 0,
    balance: ''
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }

  addTransaction(): void {
    if (
      !this.transaction.date ||
      !this.transaction.description ||
      this.transaction.amount <= 0 ||
      !this.transaction.balance
    ) {
      alert('Please fill all fields properly');
      return;
    }

    this.transactionService.addTransaction(this.transaction).subscribe({
      next: () => {
        alert('Transaction added successfully');
        this.transaction = {
          date: '',
          description: '',
          type: 0,
          amount: 0,
          balance: ''
        };
        this.loadTransactions();
      },
      error: (err) => {
        console.error('Error adding transaction:', err);
      }
    });
  }

  filterTransactions(): void {
    if (!this.selectedDate) {
      return;
    }

    this.transactionService.filterByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error filtering transactions:', err);
      }
    });
  }

  sortTransactions(): void {
    this.transactionService.sortByAmount().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error sorting transactions:', err);
      }
    });
  }

  showAll(): void {
    this.selectedDate = '';
    this.loadTransactions();
  }

  getTypeText(type: number): string {
    return type === 0 ? 'Credit' : 'Debit';
  }
}