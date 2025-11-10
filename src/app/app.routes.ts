import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { SignUp } from './Components/sign-up/sign-up';
import { TransactionList } from './Components/transaction-list/transaction-list';
import { TransactionForm } from './Components/transaction-form/transaction-form';
import { authGurd } from './Components/Gurds/auth.gurd';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: SignUp,
  },
  {
    path: 'transaction',
    component: TransactionList,
    canActivate: [authGurd],
  },
  {
    path: 'add',
    component: TransactionForm,
    canActivate: [authGurd],
  },
  {
    path: 'edit/:id',
    component: TransactionForm,
    canActivate: [authGurd],
  },
  {
    path: '',
    component: TransactionList,
  },
  {
    path: '**',
    redirectTo: '/transaction',
  },
];
