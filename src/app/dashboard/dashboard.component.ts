import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  handleTransfer:boolean=true
  transferSuccessMsg:string=""
  transferFailMsg:string=""
  balance:number=0
  showOffcanvas:boolean=true
  isCollapse:boolean= true
  user:string=""

  // transferform
  transferForm = this.fb.group({
    creditAcno:["",[Validators.required,Validators.pattern("[0-9]*")]],
    creditAmount:["",[Validators.required,Validators.pattern("[0-9]*")]],
    profilePswd:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })

  constructor(private fb:FormBuilder,private api:ApiService,private toaster:ToasterService,private dashboardRouter:Router){

  }
  ngOnInit(): void {
    //get loginusername from local storage and assign to class property
    this.user = localStorage.getItem("loginUsername") || ""
  }

  collapse(){
    this.isCollapse =!this.isCollapse
  }

  //getBalance
  getBalance(){
    //get loginUserAcno from local storage
    let acno = localStorage.getItem("loginUserAcno")
    //call balance fn of service
    this.api.balanceEnquiry(acno).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.balance=res
      },
      error:(err:any)=>{
        this.showOffcanvas=false
        console.log(err.error);
        this.toaster.showError(err.error,"Fail")
      }
    })
  }

  //transfer
  transfer(){
    //validate form
    if(this.transferForm.valid){
      //get input values from transferForm
      let creditAcno = this.transferForm.value.creditAcno
      let creditAmount = this.transferForm.value.creditAmount
      let profilePswd = this.transferForm.value.profilePswd
      //make call to service
      this.api.fundTransfer(creditAcno,creditAmount,profilePswd).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.transferSuccessMsg=res
          this.handleTransfer=false
          setTimeout(() => {
            this.transferSuccessMsg=""
            this.handleTransfer=true
            this.transferForm.reset()
          }, 5000);
        },
        error:(err:any)=>{
          console.log(err.error);
          this.transferFailMsg=err.error
          this.handleTransfer=false
          setTimeout(() => {
            this.transferFailMsg=""
            this.handleTransfer=true
            this.transferForm.reset()
          }, 3000);
        }
      })
    }
    else{
      this.toaster.showWarning("Invalid Form", "Warning")
      //alert("Invalid Form")
    }
  }

  //cancelTransfer
  cancelTransfer(){
    this.transferForm.reset()
    this.transferFailMsg=""
    this.transferSuccessMsg=""
  }

  //deleteMyAcno
  deleteMyAcno(){
    //make call to api service
    this.api.deleteAcno().subscribe({
      next:(res:any)=>{
        console.log(res);
        //alert res alert(res)
        this.toaster.showWarning(res,"Warning")
        this.logout();
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  //logout
  logout(){
    //remove login data from local storage
    localStorage.removeItem("loginUserAcno")
    localStorage.removeItem("loginUsername")
    localStorage.removeItem("token")
    setTimeout(()=>{
      //redirect to landing page
        this.dashboardRouter.navigateByUrl('')
      },1000)
  }

}
