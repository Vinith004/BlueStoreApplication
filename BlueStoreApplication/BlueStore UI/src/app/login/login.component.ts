import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { } from 'jquery';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ActiveTabLogin = true;
  ActiveTabRegister = false;
  CredentialValidation="";

  LoginForm:any;
  RegisterForm:any;

  constructor(private Service:SharedService,private router:Router,private Toast:ToastrService) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      "UserName":new FormControl(null,[Validators.required]),
      "Password":new FormControl(null,[Validators.required])
    })

    this.RegisterForm = new FormGroup({
      "UserName":new FormControl(null,[Validators.required]),
      "Email":new FormControl(null,[Validators.required,Validators.email]),
      "Password":new FormControl(null,[Validators.required])
    })
  }

  get UserNameR(){
   return this.RegisterForm.get('UserName')
  }
  get EmailR(){
    return this.RegisterForm.get('Email')
  }

  get PasswordR(){
    return this.RegisterForm.get('Password')
  }

  get UserNameL(){
    return this.LoginForm.get('UserName');
  }
  get PasswordL(){
    return this.LoginForm.get('Password');
  }

  RegisterTab(){
    this.ActiveTabRegister = true;
    this.ActiveTabLogin =false
  }
  LoginTab(){
    this.ActiveTabRegister = false;
    this.ActiveTabLogin =true
  }
  Register(){
    $(".loader").show();
    var val ={
      id: 0,
      userName: this.RegisterForm.value.UserName,
      email: this.RegisterForm.value.Email,
      password: this.RegisterForm.value.Password,
      role: "User"
    }
    this.Service.Register(val).subscribe(res=>{
      this.Toast.success(res)
      // Swal.fire(res,'','success')
      //  alert(res);
      // sessionStorage.setItem('Token',"57asd897a9sd8")
      setTimeout(() => {
        $(".loader").hide();
        this. LoginTab()
      }, 1000);
      
    });
  }

  Login(){
    $(".loader").show();
    var val ={
      id: 0,
      userName: this.LoginForm.value.UserName,
      email: "User@gmail.com",
      password: this.LoginForm.value.Password,
      role: "User"
    }
    this.Service.LoginCheck(val).subscribe(res =>{
      if(res.message != "invalid"){
      
        sessionStorage.setItem('Token',"57asd897a9sd8")
        localStorage.setItem('Role',res.userRole);
        localStorage.setItem('UserID',res.userDetails.id)
        // this.Service.saveUserDate(res.userDetails);
        setTimeout(() => {
          $(".loader").hide();
          this.router.navigate(['/Home']).then(() =>{
            window.location.reload();
          })
        }, 1000);

    
      }else{
        $(".loader").hide();
        this.Toast.error('Invalid credential')
        // alert("Invalid credential")
        // Swal.fire('Invalid credential')
        // $.toast('Here you can put the text of the toast')
      }
    });
  }
}


