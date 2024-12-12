import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { Error404Component } from './components/public/error404/error404.component';
import { ProductsComponent } from './components/public/products/products.component';
import { PadreComponent } from './components/padre/padre.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'home', component:HomeComponent},
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'products', component:ProductsComponent},
    { path: 'padre', component:PadreComponent},
    { path: '404', component:Error404Component},
    { path: '**', pathMatch: 'full', redirectTo: '404'}
];
