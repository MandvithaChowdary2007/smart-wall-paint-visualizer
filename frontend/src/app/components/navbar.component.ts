import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
 selector:'app-navbar',
 template:`<nav class="nav wrap">
  <a routerLink="/" class="logo">SWP<span>●</span></a>
  <div class="links">
    <a routerLink="/">Home</a><a routerLink="/visualizer">Visualizer</a><a routerLink="/shop">Shop</a><a routerLink="/calculator">Calculator</a>
    <a *ngIf="auth.isAdmin()" routerLink="/admin">Admin</a>
  </div>
  <div class="nav-actions">
    <a *ngIf="!auth.user()" class="btn mini" routerLink="/auth">Login</a>
    <button *ngIf="auth.user()" class="btn mini" (click)="logout()">Logout</button>
  </div>
 </nav>`,
 styles:[`.nav{display:flex;align-items:center;justify-content:space-between;padding:18px 0;gap:20px}.logo{font-size:28px;font-weight:1000;color:#111;text-decoration:none}.logo span{color:#f15a29}.links{display:flex;gap:20px;flex-wrap:wrap}.links a{color:#111;text-decoration:none;font-weight:800}.mini{padding:9px 14px!important}`]
})
export class NavbarComponent {
 constructor(public auth:AuthService){}
 logout(){this.auth.logout();location.href='/';}
}
