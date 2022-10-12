import {HostListener, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferringService } from '../transferring.service';
import * as $ from 'jquery'

declare var Razorpay:any

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  options = {
    "key": "rzp_test_fLqlenSeejYMwx",
    "amount": "50", 
    "currency": "INR",
    "name": "Blue store",
    "description": "Web Development",
    "image": "https://localhost:7044/Photos/LogoBS.png",
    "order_id":"",
    "handler": function (response:any){
        var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };

  form: any = {}; 
  paymentId!: string;
  error!: string;

  Orderform:any=[];
  data:any =[];
  TotalQty:number=0;
  TotalAmount:number=0;
  constructor(private Tservice:TransferringService,private router:Router) { }

  ngOnInit(): void {
   this.Tservice.getData().subscribe(res=>{
    this.data = res;
    console.log(res)
    for(var i = 0;res.length > i;i++){
      this.TotalAmount += parseInt(res[i].price) * parseInt(res[i].qty)
      this.TotalQty += parseInt(res[i].qty) ;
    }
    if(res.length == 0){
      this.router.navigate(['/Cart']).then(() =>{
        window.location.reload();
      })
    }
    if(this.TotalAmount < 500){
      this.TotalAmount += 40;
    }
  });
  this.Orderform =new FormGroup({
    "Address1":new FormControl("200,AMMan coil street",[Validators.required]),
    "Address2":new FormControl("Thattan vilai",[Validators.required]),
    "city":new FormControl("Nagercoil",[Validators.required]),
    "state":new FormControl("Tamilnadu",[Validators.required]),
    "zip":new FormControl(629002,[Validators.required,Validators.pattern('[0-9]{6}')]),
    "FullName":new FormControl("Vinith R",[Validators.required]),
    "MobileNumber":new FormControl(8667308763,[Validators.required,Validators.pattern('[0-9]{10}')]),
    "Email":new FormControl("vinithngl04@gmail.com",[Validators.required,Validators.email])
  })
  }
  get FullName(){
    return this.Orderform.get('FullName');
  }
  get MobileNumber(){
    return this.Orderform.get('MobileNumber');
  }
  get Email(){
    return this.Orderform.get('Email');
  }
  get Address1(){
    return this.Orderform.get('Address1');
  }
  
  get Address2(){
    return this.Orderform.get('Address2');
  }
  get city(){
    return this.Orderform.get('city');
  }
  
  get state(){
    return this.Orderform.get('state');
  }  
  get zip(){
    return this.Orderform.get('zip');
  }
  Order(){
    var message="";
    var val;
    var Name = this.Orderform.value.FullName;
    var MobileNumber = this.Orderform.value.MobileNumber;
    var Email = this.Orderform.value.Email;
    var addaddress = this.Orderform.value.Address1 + "," + this.Orderform.value.Address2 + "," +this.Orderform.value.state + "," + this.Orderform.value.city + "-" + this.Orderform.value.zip
    for(var i=0;this.data.length > i;i++){
      val={
        "purchaseId": 0,
        "userId": this.data[i].userId,
        "productId": this.data[i].productID,
        "productName": this.data[i].productName,
        "userName": this.data[i].userName,
        "qty": this.data[i].qty,
        "paymentType": "RazorPay",
        "purchaseType": "Cart",
        "deliveryAddress": addaddress,
        "totalPrice": this.data[i].price.toString() 
      }
      this.Tservice.Order(val).subscribe(res=> {
        message = res;
        this.paymentId = ''; 
         this.error = ''; 
         this.Tservice.CreateOrder(this.TotalAmount).subscribe(
          data => {
            debugger;
         this.options.key = "rzp_test_tZNC63iFJ18uPS";
        this.options.order_id = data.id;
        this.options.amount = data.amount;  //paise
        this.options.prefill.name = Name;
        this.options.prefill.email = Email;
        this.options.prefill.contact = MobileNumber;
        var rzp1 = new Razorpay(this.options);
        rzp1.open();
        
        rzp1.on('payment.failed', function (response:any){    
          // Todo - store this information in the server
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          }) 

          // this.error = response.error.reason;
      });
        
      });
    }
    // alert("Your Order Successfully placed to your address");
    // this.router.navigate(['/Home']).then(() =>{
    //   window.location.reload();
    // })
  }
  

 
  @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event:any): void {
      $(".PayementPopup").show();
        // this.orderService.updateOrder(event.detail).subscribe(
        // data => {
        //     this.paymentId = data.message;
        // }
        // ,
        // err => {
        //     this.error = err.error.message;
        // }
        // );
    }
}
