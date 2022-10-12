import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedService } from './shared/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductMasterComponent } from './product-master/product-master.component';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './product-list/cart/cart.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AboutComponent } from './home/about/about.component';
import { AddProductComponent } from './product-master/add-product/add-product.component';
import { ShowproductComponent } from './product-master/showproduct/showproduct.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductMasterComponent,
    LoginComponent,
    CartComponent,
    PurchaseComponent,
    AboutComponent,
    AddProductComponent,
    ShowproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
