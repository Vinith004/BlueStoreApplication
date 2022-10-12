import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import * as $ from 'jquery'
import { TransferringService } from '../transferring.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  HighlightPro:any=0;
  UserId:number =0;
  ProtuctType:any = "";
  ProductList:any;
  PhotoUrl ="";
  constructor(private service:SharedService,private router:Router,private Tservice:TransferringService) { }

  ngOnInit(): void {
    this.HighlightPro = localStorage.getItem('HighlightPro');
     localStorage.removeItem('HighlightPro');
    // alert("HighlightPro removed")
    this.service.DataUserDetails.subscribe(value => this.UserId = value)
    this.service.ProductType.subscribe(PT =>this.ProtuctType = PT)
    this.PhotoUrl = "https://localhost:7044/Photos/"+this.ProtuctType+"/";
    this.GetPL(this.ProtuctType);
  }
 
  GetPL(ProtuctType:string){
    this.service.getProductList(ProtuctType).
    subscribe(res=> {
      this.ProductList = res;
    })
  }

  AddCart(ProID:number,ProductName:string){
    $(".loader").show();
    var val= {
      ShoppingCartId:0,
      UserId:this.UserId,
      ProductId:ProID,
      ProductName:ProductName
    }
   this.service.AddCart(val).subscribe(data=>{
    setTimeout(() => {
      $(".loader").hide();
      this.router.navigate(['/Cart'])
    }, 700);
   
   })
  }

  BuyNow(ProductId:any,productName:any,price:any){
    var val =[{
      price:price,
      productName:productName,
      productID:ProductId,
      qty:1,
      userId:localStorage.getItem('UserID'),
      userName:""
    }]
    console.log(ProductId,productName)
    this.Tservice.updatedate(val);
    this.router.navigate(['/Purchase']).then(()=>{
      // window.location.reload();
    })
  }
  

}
