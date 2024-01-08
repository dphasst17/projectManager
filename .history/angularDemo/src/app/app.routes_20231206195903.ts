import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { MainComponent } from './components/layout/main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent }
    ]}
  ];