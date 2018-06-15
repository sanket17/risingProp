import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log(x) {
    console.log(x);
  }

  submit(f) { console.log(JSON.stringify(f.value)); }

  constructor() { }

  ngOnInit() {
  }

}
