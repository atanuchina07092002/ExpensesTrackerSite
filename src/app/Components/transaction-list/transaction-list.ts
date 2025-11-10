import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../Services/transaction';
import { TransactionModel } from '../../Models/transactionModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {
  tranService = inject(Transaction);
  transaction: TransactionModel[] = [];
  totalIncome: number = 0;
  totalExpenses: number = 0;
  totalBalance: number = 0;
  router = inject(Router);
  ngOnInit(): void {
    this.getAllTransaction();
  }

  getAllTransaction(): void {
    this.tranService.getAll().subscribe({
      next: (res) => {
        this.transaction = res;
        this.getTotalIncome(this.transaction);
      },
    });
  }
  getTotalIncome(transaction: TransactionModel[]): void {
    this.totalIncome = 0;
    this.totalExpenses = 0;
    transaction.forEach((element) => {
      if (element.type === 'Income') {
        this.totalIncome += element.amount;
      } else if (element.type === 'Expense') {
        this.totalExpenses += element.amount;
      }
    });
    this.totalBalance = this.totalIncome - this.totalExpenses;
  }
  updateTransaction(transaction: TransactionModel) {
    if (transaction.id != null) {
      this.router.navigate(['/edit/', transaction.id]);
    } else {
      console.log('Id not found');
    }
  }
  deleteTransaction(transaction: TransactionModel) {
    if (transaction.id != null) {
      if (confirm('Are you sure want to delete?'))
        this.tranService.deleteById(transaction.id).subscribe({
          next: () => {
            this.getAllTransaction();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      console.log('Id not found');
    }
  }
}
