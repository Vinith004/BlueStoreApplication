import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import * as $ from 'jquery'
import { TransferringService } from 'src/app/transferring.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  TotalQty:number=0;
  TotalAmount:number=0;
  CartProductList:any =[];
  UserDetail:any;
  PhotoUrl ="";
  constructor(private service:SharedService,private Tservice:TransferringService,private router:Router) { }

  ngOnInit(): void { 
    this.service.DataUserDetails.subscribe(value =>{
      this.UserDetail = value   
    })
    this.GetCartProduct(this.UserDetail);
    this.PhotoUrl = "https://localhost:7044/Photos/";
  }

  GetCartProduct(val:any){
    this.service.GetCartProduct(val).subscribe(res=>{
      this.CartProductList = res;
      this.TotalQty = res.length
      for(var i = 0;this.CartProductList.length > i;i++){
        this.TotalAmount += parseInt(this.CartProductList[i].price) * parseInt(this.CartProductList[i].qty)
      }
    })
  }

  Qty(qtyval:any,index:number){
    var Qtyval = qtyval.target.value;
    this.CartProductList[index].qty = Qtyval;
    this.TotalQty =0;
    this.TotalAmount = 0;
    for(var i = 0;this.CartProductList.length > i;i++){
      this.TotalAmount += parseInt(this.CartProductList[i].price) * parseInt(this.CartProductList[i].qty)
      this.TotalQty += parseInt(this.CartProductList[i].qty) ;
    }
  }

  RemoveCart(SId:number){
    $(".loader").show();
    this.service.RemoveCart(SId).subscribe(res=>{
      setTimeout(() => {
        $(".loader").hide();
        window.location.reload();
      }, 700);
    
    })   
  }
  GoToPurchase(){
    this.Tservice.updatedate(this.CartProductList);
    this.router.navigate(['/Purchase']).then(()=>{
      // window.location.reload();
    })
  }

}
