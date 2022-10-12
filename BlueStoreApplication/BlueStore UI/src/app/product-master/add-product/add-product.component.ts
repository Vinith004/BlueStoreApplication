import { Component, OnInit,Input } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { ShowproductComponent } from '../showproduct/showproduct.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Input() pro:any;
  productIDChild:number=0;
  priceChild!:string;
  productNameChild!:string ;
  photofilepathchild!:string;
  productPicFileNamechild:string="";
  DescriptionChild!:string;
  productTypechild!:string;

  constructor(private service:SharedService,private s:ShowproductComponent) { }
   
  ngOnChanges() {
   if(this.pro != undefined){
    this.productIDChild = this.pro.productID;
    this.productNameChild = this.pro.productName;
    this.priceChild = this.pro.price;
    this.DescriptionChild = this.pro.description;
    this.productTypechild = this.pro.productType;
    this.productPicFileNamechild = this.pro.productPicFileName;
  if(this.pro.productID > 0){
    this.photofilepathchild = this.service.photoURL+"/"+ this.pro.productType + "/"+ this.pro.productPicFileName;
  }else{
    this.photofilepathchild =  this.service.photoURL+ "/BrandUpload.png";

  }
   }

  }

  ngOnInit(): void {
    this.photofilepathchild = this.service.photoURL+ "/BrandUpload.png";
 
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formdata:FormData = new FormData();
    formdata.append('uploadFile',file,file.name);
    this.service.UploadPhoto(formdata).subscribe((data:any)=>{
       this.productPicFileNamechild = data;
       this.photofilepathchild =this.service.photoURL +"/" +this.productPicFileNamechild;
    })
  }

  addProduct(myForm:any){
    if(myForm.invalid){
      Swal.fire("Validation failed");
      // alert("Validation failed")
      return;
    }
    var val ={
      productID :0,
      productName:this.productNameChild,
      price:this.priceChild,
      description:this.DescriptionChild,
      ProductType:this.productTypechild,
       productPicFileName:this.productPicFileNamechild
    }
    this.service.addProduct(val).
    subscribe(data => {
      Swal.fire(data,'','success');
      // alert("Product added successfully");
      this.CancelClick(myForm);
      this.s.RefreshList();
      $(".close").trigger('click')
    }); 
  }

  UpdateClick(myForm:any){
    if(myForm.invalid){
      // alert("Validation failed")
      Swal.fire("Validation failed");
      return;
    }
    var val ={
      productID :this.productIDChild,
      productName:this.productNameChild,
      price:this.priceChild,
      description:this.DescriptionChild,
      ProductType:this.productTypechild,
       productPicFileName:this.productPicFileNamechild
    }
    this.service.UpdateProduct(val).
    subscribe(data => {
      // alert(data);
      Swal.fire(data,'','success');
      this.CancelClick(myForm);
      this.s.RefreshList();
      $(".close").trigger('click')
    });
  }

  CancelClick(myForm:any){
    myForm.reset();
    myForm.controls['productType'].setValue("");
    this.photofilepathchild =this.service.photoURL+ "/BrandUpload.png";
    
  }
}
