import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading:boolean = false;
  public username:string;
  public password:string;
  public identity:any;
  public errorMessage:string;

  private readonly http:HttpClient;
  constructor (http:HttpClient) {
    this.http = http;
  }

  public login() {
    this.loading = true;
    this.http.post('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe(data => {
        this.loading = false;
        let d = data as any;
        if (d.result === true) {
          this.identity = d.token;
        }
        else {
          this.errorMessage = "Login Failed.";
        }
      });
  }

}
