import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:any=[]
  searchKey:string=""
  
  constructor(private api:ApiService,private toaster:ToasterService){

  }

  ngOnInit(): void {
    //make call to service
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log(res);   
        this.transactions=res 
      },
      error:(err:any)=>{
        console.log(err.error);    
        this.toaster.showError(err.error,"Fail")
      }
    })
  }

  //generatePDF
  generatePDF(){
    //1. create object for jspdf
    let pdf = new jspdf()
    //2. create title row
    let title_row = ['Type','Debit Account','Credit Account','Amount']
    // table_body should be array of array
    let table_body:any =[]
    pdf.setFontSize(16)
    pdf.text("All transactions",10,10)
    pdf.setFontSize(12)

    //convert transactions to array array
    for(let element of this.transactions){
      var temp = [element.transaction_type,element.fromAcno,element.toAcno,element.amount]
      table_body.push(temp)
    }
    (pdf as any).autoTable(title_row,table_body)
    //view in new tab
    pdf.output('dataurlnewwindow')
    //download pdf
    pdf.save('transactions.pdf')
  }
}
