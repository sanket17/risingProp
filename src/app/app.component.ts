import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rising Prop';
  

  ngOnInit() {    
    if(this.router.url !== "/SearchListPropertyComponent"){
      sessionStorage.setItem('loadCount',undefined);
      sessionStorage.setItem('searchObj',undefined);
      
    }    
  }
  constructor(private router: Router) {}
  removeHeader() {
    if(this.router.url === "/admin") {
      return false;
    }else {
      return true;
    }
  }
}
