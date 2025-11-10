import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from '../Models/transactionModel';

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  http = inject(HttpClient);
  baseUrl = 'https://localhost:44395/api/Transactions/';
  getAll(): Observable<TransactionModel[]> {
    return this.http.get<TransactionModel[]>(this.baseUrl + 'all');
  }

  getById(id: number): Observable<TransactionModel> {
    return this.http.get<TransactionModel>(this.baseUrl + 'details/' + id);
  }

  created(transaction: TransactionModel): Observable<void> {
    return this.http.post<void>(this.baseUrl, transaction);
  }

  updateById(id: number, transaction: TransactionModel): Observable<TransactionModel> {
    return this.http.put<TransactionModel>(this.baseUrl + 'update/' + id, transaction);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete/' + id);
  }
}
