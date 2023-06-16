import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='https://bank-jan-23.onrender.com'
  constructor(private http:HttpClient) { }

  //register api
   register(username:any,acno:any,password:any) {
    //req body
    const body={
      username,
      acno,
      password
    }
    //to call register api
   return this.http.post(`${this.base_url}/employee/register`,body)
  }

  //login api
  login(acno:any,password:any){
    const body ={
      acno,
      password
    }
    //api call
    return this.http.post(`${this.base_url}/employee/login`,body)
  }

  //adding header to http req
  appendToken(){
    //get token from local storage
    const token = localStorage.getItem("token")
    //create http header
    let headers = new HttpHeaders()
    if(token){
      //apend token in headers
      headers =headers.append("access-token",token)
      options.headers = headers
    }
    return options
  }

  //balanceenquiry
  balanceEnquiry(acno:any){
    //make server api calll to get balance
    return this.http.get(`${this.base_url}/user/balance/${acno}`,this.appendToken())
  }

  //fund transfer
  fundTransfer(creditAcno:any,creditAmount:any,pswd:any){
    //req body
    const body={
      creditAcno,
      creditAmount,
      pswd
    }
    //make an api call
    return this.http.post(`${this.base_url}/user/transfer`,body,this.appendToken())
  }

  //getTransactions
  getTransactions(){
    return this.http.get(`${this.base_url}/user/ministatement`,this.appendToken())
  }
  
  //deleteAcno
  deleteAcno(){
    //make an api call
    return this.http.delete(`${this.base_url}/user/delete`,this.appendToken())
  }
}
