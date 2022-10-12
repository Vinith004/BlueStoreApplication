import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './product-list/cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { PurchaseComponent } from './purchase/purchase.component';
import {AuthGuard} from './shared/auth.guard'
import { RoleGuard } from './shared/role.guard';

const routes: Routes = [
  {path:'',redirectTo:"/Login",pathMatch:"full"},
  {path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:"Products",component:ProductListComponent,canActivate:[AuthGuard]},
  {path:"ProductMaster",component:ProductMasterComponent,canActivate:[AuthGuard,RoleGuard]},
  {path:"Login",component:LoginComponent},
  {path:"Cart",component:CartComponent,canActivate:[AuthGuard]},
  {path:"Purchase",component:PurchaseComponent,canActivate:[AuthGuard]},
  {path:"About",component:AboutComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
