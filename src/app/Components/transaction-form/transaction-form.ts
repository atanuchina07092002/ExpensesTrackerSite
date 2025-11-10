import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../Services/transaction';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.css'],
})
export class TransactionForm implements OnInit {
  incomeCategories: string[] = ['Salary', 'Freelance', 'Investment'];
  expensesCategories: string[] = ['Food', 'Transportation', 'Entertainment'];
  transactionCategories: string[] = [];
  transactionForm!: FormGroup;
  transactionMode: boolean = false;
  transactionId: number = 0;

  fb = inject(FormBuilder);
  router = inject(Router);
  tranService = inject(Transaction);
  activatedRoute = inject(ActivatedRoute); //to get the id from url

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      type: ['Income', Validators.required],
      category: ['', Validators.required],
      amount: ['0.00', [Validators.required, Validators.min(0.01)]],
      createdAt: [new Date(), Validators.required],
    });
    this.allCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.transactionMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }

  allCategories() {
    this.transactionForm.get('type')?.valueChanges.subscribe((type) => {
      this.transactionCategories =
        type === 'Income' ? this.incomeCategories : this.expensesCategories;
      this.transactionForm.get('category')?.reset();
    });

    this.transactionCategories = this.incomeCategories;
  }

  onSubmit(): void {
    if (this.transactionForm.valid && this.transactionMode === false) {
      console.log('Form Data:', this.transactionForm.value);
      this.tranService
        .created(this.transactionForm.value)
        .subscribe((data) => this.router.navigateByUrl('/transaction'));
    } else {
      // Update existing transaction
      this.tranService
        .updateById(this.transactionId, this.transactionForm.value)
        .subscribe(() => this.router.navigateByUrl('/transaction'));
    }
  }
  Cancle() {
    this.router.navigateByUrl('/transaction');
  }
  loadTransaction(transactionId: number): void {
    this.tranService.getById(transactionId).subscribe({
      next: (tran) => {
        this.transactionForm.patchValue({
          type: tran.type,
          category: tran.category,
          amount: tran.amount,
        });

        // 🔥 Force categories to refresh immediately based on the loaded type
        // const type = this.transactionForm.get('type')?.value;
        // this.transactionCategories =
        //   type === 'Income' ? this.incomeCategories : this.expensesCategories;
      },
    });
  }
}
