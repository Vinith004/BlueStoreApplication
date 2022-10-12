import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {

  constructor(private service:SharedService) { }

  ModelTitle ="Add Products";
  ProductList:any;
  pro:any;

  ngOnInit(): void {
    this.RefreshList();
 
  }
  addclick(){
    this.pro = {
      description: "",
      price: '',
      productID: 0,
      productName: "",
      productPicFileName: "",
      productType: ""
    }
  }

  ngOnChanges() {
    this.RefreshList();
  }

  editClick(items:any){
    this.pro = items;
    this.ModelTitle = "Update Product"
  }
  deleteClick(items:any){
    Swal.fire({
      title: 'Are sure want to delete this product??',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result)=>{
      if (result.isConfirmed) {
        var id = items.productID;
        this.service.deleteproduct(id)
        .subscribe(res=>{
          Swal.fire(res);
          this.RefreshList();
       })
      }
    })
  }

  
  RefreshList(){
    this.service.getALLProductList().subscribe(data=>{
      this.ProductList = data;
      console.log(this.ProductList)
    })
  }

}
