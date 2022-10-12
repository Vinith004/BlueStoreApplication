import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private service:SharedService) { }

  ngOnInit(): void {
  }

  ToProductList(Type:string){
    $(".loader").show();
    this.service.UpdateProductType(Type);
    setTimeout(() => {
      $(".loader").hide();
      this.router.navigate(['Products'])
    }, 700);
    
    
  }
}
