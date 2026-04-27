import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list/employee-list';
import { Login } from './auth/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'employees', component: EmployeeList, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
