import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductComponent } from './product/product';
import { ProductDetail } from './product-detail/product-detail';
import { Contact } from './contact/contact';
import { Error } from './error/error';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'products', component: ProductComponent},
    {path: 'product/:id', component: ProductDetail},
    {path: 'contact', component: Contact},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: Error}
];
