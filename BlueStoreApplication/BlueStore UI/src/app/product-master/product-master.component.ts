import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';



@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    
  }





}
