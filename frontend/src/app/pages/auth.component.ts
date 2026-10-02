import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
 selector:'app-auth',
 template:`
 <section class="auth page wrap">
  <div class="auth-card">
   <div class="page-title"><small>ACCOUNT</small><h1>{{mode==='login'?'WELCOME':'JOIN THE CLUB'}}</h1></div>
   <div class="switch"><button (click)="mode='login'" [class.active]="mode==='login'">LOGIN</button><button (click)="mode='register'" [class.active]="mode==='register'">REGISTER</button></div>
   <label *ngIf="mode==='register'">Name<input [(ngModel)]="form.name"></label>
   <label>Email<input type="email" [(ngModel)]="form.email"></label>
   <label>Password<input type="password" [(ngModel)]="form.password"></label>
   <button class="btn primary full" (click)="submit()">{{mode==='login'?'LOGIN':'CREATE ACCOUNT'}}</button>
   <p class="error">{{message}}</p>
  </div>
 </section>`
})
export class AuthComponent {
 mode='login';form:any={name:'',email:'',password:''};message='';
 constructor(private auth:AuthService,private router:Router){}
 submit(){const call=this.mode==='login'?this.auth.login(this.form):this.auth.register(this.form);call.subscribe({next:r=>{this.auth.setSession(r);this.router.navigateByUrl('/');},error:e=>this.message=e.error?.message||'Something went wrong'});}
}
