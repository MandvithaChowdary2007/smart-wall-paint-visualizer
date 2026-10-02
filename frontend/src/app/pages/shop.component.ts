import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
 selector:'app-shop',
 template:`
 <section class="page wrap">
   <div class="page-title"><small>04 / SHOP</small><h1>FIND YOUR<br><span>SHADE.</span></h1><p>Indian-home friendly colours, finishes and coverage in INR.</p></div>
   <div class="filterbar"><button *ngFor="let c of cats" [class.active]="cat===c" (click)="cat=c">{{c}}</button></div>
   <div class="products">
    <article *ngFor="let p of filtered()" class="product">
      <div class="shade" [style.background]="p.hex"><span>₹{{p.price}}</span></div>
      <div class="product-body"><small>{{p.category}} · {{p.finish}}</small><h3>{{p.name}}</h3><p>{{p.coverage}} sq.ft/L · ★ {{p.rating}}</p><button class="btn primary full" routerLink="/visualizer">VISUALIZE THIS COLOR</button></div>
    </article>
   </div>
 </section>`
})
export class ShopComponent {
 cats=['All','Warm','Cool','Neutral','Earthy','Bold','Pastel','Luxury'];cat='All';products:any[]=[];
 constructor(private api:ApiService){this.api.get<any[]>('/colors').subscribe(x=>this.products=x);}
 filtered(){return this.cat==='All'?this.products:this.products.filter(x=>x.category===this.cat);}
}
