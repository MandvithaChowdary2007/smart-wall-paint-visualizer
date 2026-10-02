import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({providedIn:'root'})
export class AuthService {
  constructor(private api:ApiService){}
  login(data:any){return this.api.post<any>('/auth/login',data);}
  register(data:any){return this.api.post<any>('/auth/register',data);}
  setSession(r:any){localStorage.setItem('token',r.token);localStorage.setItem('user',JSON.stringify(r.user));}
  logout(){localStorage.removeItem('token');localStorage.removeItem('user');}
  token(){return localStorage.getItem('token');}
  user(){try{return JSON.parse(localStorage.getItem('user')||'null');}catch{return null;}}
  isAdmin(){return this.user()?.role==='Admin';}
}
