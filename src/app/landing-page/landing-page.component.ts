import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  isCollapse:boolean= true

  collapse(){
    this.isCollapse =!this.isCollapse
  }
}
