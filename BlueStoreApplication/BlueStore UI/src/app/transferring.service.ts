import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class TransferringService {

  
  APIurl = "https://localhost:7044/api";

  private data =new BehaviorSubject<any>([]);
  opendata = this.data.asObservable();
  constructor(private http:HttpClient) { }

  updatedate(value:any){
    this.data.next(value);
  }

  getData(){
    let temp = this.data;
    let de = this.opendata;
    return temp;
  }

  Order(val:any){
   return this.http.post(this.APIurl+"/Purchase",val,{responseType:"text"});
  }
  
  CreateOrder(Order:any):Observable<any>{
    return this.http.post(this.APIurl + "/Payment/" + Order,Order,httpOptions);
  }
}
