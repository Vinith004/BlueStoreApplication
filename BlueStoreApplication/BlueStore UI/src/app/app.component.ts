import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { SharedService } from './shared/shared.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BlueStore';
  usertype:string | null ='';
  filteredsearchdatalist=[{productName:"*"}];
  SearchDataList:any ;
  IsLoggedIn!:boolean;
  input:any = document.getElementById("myInput")
  noResults:any = document.getElementById("no-results")
 
  constructor (private router:Router,private service:SharedService){}

  Logout(){
    this.router.navigate(['/Login']);
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Role');
    localStorage.removeItem('HighlightPro');
  }

  ngOnInit(): void {
    
    this.service.UserType.subscribe(value => this.usertype = value);
    this.IsLoggedIn = !!sessionStorage.getItem('Token');
    this.service.getALLProductList().subscribe(data=>{
      this.SearchDataList = data;
      // console.log(this.ProductList)
    })
  }
  inputListener(event:any){
    debugger;
    const inputuppertext  = event.target.value.toUpperCase();
    if (inputuppertext === "") {
      this.filteredsearchdatalist =[{productName:"*"}];
      return; // Quits early if input is empty
    }
    this.filteredsearchdatalist =[];
    for(var i=0;this.SearchDataList.length>i ;i++){
      if(this.SearchDataList[i].productName.toUpperCase().includes(inputuppertext)){
        this.filteredsearchdatalist.push(this.SearchDataList[i])
      }
    }
    if(this.filteredsearchdatalist.length == 0){
      this.filteredsearchdatalist =[{productName:"*"}];
    }
  }

  FindProduct(item:any){
    this.service.UpdateProductType(item.productType);
    this.filteredsearchdatalist =[{productName:"*"}];
    localStorage.setItem('HighlightPro',item.productID)
    console.log(item);
    var location =window.location.pathname
    this.router.navigate(['Products']).then(()=>{
      if(location == '/Products'){
        window.location.reload();
      }
      
    })

    // setTimeout(() => {
    //   $(".loader").hide();
     
    // }, 700);
  }
  
}
