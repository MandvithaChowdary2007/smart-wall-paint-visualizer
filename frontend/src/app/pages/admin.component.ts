import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
 selector:'app-admin',
 template:`
 <section class="page wrap">
  <div class="page-title"><small>ADMIN / CONTROL ROOM</small><h1>MANAGE<br><span>THE PALETTE.</span></h1></div>
  <div class="stats"><div *ngFor="let s of statList"><b>{{stats[s] || 0}}</b><span>{{s | uppercase}}</span></div></div>
  <div class="admin-grid">
   <div class="admin-card"><h3>Quick actions</h3><button class="btn">ADD COLOR</button><button class="btn">ADD PRODUCT</button><button class="btn">ADD PATTERN</button></div>
   <div class="admin-card"><h3>Activity</h3><p>Users, saved projects and catalogue counts are available through the protected API.</p><code>GET /api/admin/stats</code></div>
  </div>
 </section>`
})
export class AdminComponent {
 stats:any={};statList=['users','projects','colors','products'];
 constructor(private api:ApiService){this.api.get('/admin/stats').subscribe(x=>this.stats=x);}
}
