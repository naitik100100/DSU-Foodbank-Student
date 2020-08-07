import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'signup', component: SignupComponent, data: {title: 'Sign Up'}},
  {path: 'cart', component: CartComponent, data: {title: 'Cart'}},
  {path: 'home', component: HomeComponent, data: {title: 'Products'}},  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
