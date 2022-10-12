import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  ProductList:any;
  constructor(private http:HttpClient) { }
  //User Role:
  // User =new Subject<User>();
  // UserN:any;

  private UserDetails:BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem("UserID"));
  DataUserDetails=this.UserDetails.asObservable();

  UserType:BehaviorSubject<string | null>  = new BehaviorSubject(this.getUserRole());
  //-------------------------------------------------------------
  private privateproductType = new BehaviorSubject(sessionStorage.getItem("ProductType"));
  ProductType = this.privateproductType.asObservable();
  
  APIurl = "https://localhost:7044/api";
  photoURL = "https://localhost:7044/Photos"

  UpdateProductType(PT:string){
    var val  = {ProductType:PT}
    this.privateproductType.next(PT);
    sessionStorage.setItem("ProductType",PT);
  }

  // saveUserDate(UD:any){
  //   this.UserDetails.next()
  
  // }
  getUserRole(){
    return localStorage.getItem('Role')
  }

  getProductList(ProtuctType:any){
    return this.http.get(this.APIurl +"/Product/"+ProtuctType)
  }
  getALLProductList(){
    return this.http.get(this.APIurl +"/Product/")
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIurl+"/Product/SaveFile",val)
  }
  UpdateProduct(val:any){
    return this.http.put(this.APIurl+"/Product",val,{responseType:"text"});
  }

  addProduct(val:any){
    return this.http.post(this.APIurl+"/Product",val,{responseType:"text"});
  }

  deleteproduct(id:any){
    return this.http.delete(this.APIurl+"/Product/"+id,{responseType:"text"});
  }

  LoginCheck(val:any){
    return this.http.post<any>(this.APIurl+"/Login/UserLogin",val);
  }
  IsLoggedIn(){
    return !!sessionStorage.getItem('Token')
  }
  Register(val:any){
    return this.http.post(this.APIurl+"/Login",val,{responseType:"text"});
  }

  AddCart(val:any){
    return this.http.post(this.APIurl + "/ShoppingCart",val,{responseType:"text"})
  }

  GetCartProduct(UserId:any){
    return this.http.post<any>(this.APIurl +"/ShoppingCart/Cart/" + UserId,UserId)
  }

  RemoveCart(Sid:number){
    return this.http.delete(this.APIurl +"/ShoppingCart/"+Sid,{responseType:"text"});
  }
}
