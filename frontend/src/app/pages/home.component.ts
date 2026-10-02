import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 selector:'app-home',
 template:`
 <section class="hero wrap">
   <div class="hero-copy reveal">
     <div class="sticker">INDIA'S ROOM COLOUR LAB</div>
     <h1>PAINT IT.<br><span>SEE IT.</span><br>LOVE IT.</h1>
     <p>Upload your room, test real paint shades, and find the finish that feels right before you buy.</p>
     <div class="actions"><button class="btn primary" (click)="go('/visualizer')">START VISUALIZING →</button><button class="btn" (click)="go('/shop')">EXPLORE SHADES</button></div>
   </div>
   <div class="hero-art">
     <div class="room-card">
       <div class="sun"></div><div class="window"></div><div class="sofa"></div><div class="plant">🌿</div>
       <span class="paint-note">#C85C3A</span>
     </div>
   </div>
 </section>
 <section class="marquee"><div>LAND → EXPLORE → VISUALIZE → SELECT → BUY → LAND → EXPLORE → VISUALIZE →</div></section>
 <section class="section wrap">
   <div class="section-head"><div><small>01 / DISCOVER</small><h2>YOUR WALL.<br>YOUR RULES.</h2></div><p>Built for Indian homes, from compact city bedrooms to airy balconies and bold living rooms.</p></div>
   <div class="feature-grid">
     <article class="feature orange"><b>01</b><h3>UPLOAD</h3><p>Bring your own room photo. JPG and PNG supported.</p></article>
     <article class="feature yellow"><b>02</b><h3>SELECT</h3><p>Mark wall areas with a polygon tool and save the coordinates.</p></article>
     <article class="feature blue"><b>03</b><h3>VISUALIZE</h3><p>Try HEX/RGB shades with smooth transitions, compare and undo.</p></article>
   </div>
 </section>
 <section class="section dark"><div class="wrap">
   <div class="section-head"><div><small>02 / INSPIRATION</small><h2>ROOMS WITH<br>ATTITUDE.</h2></div><p>Scroll through living rooms, bedrooms, kitchens and balconies.</p></div>
   <div class="inspo"><div *ngFor="let r of rooms" class="inspo-card" [style.background]="r.color"><span>{{r.icon}}</span><h3>{{r.name}}</h3><small>{{r.tag}}</small></div></div>
 </div></section>
 <section class="section wrap cta"><div class="cta-box"><span>READY?</span><h2>MAKE YOUR<br>WALL THE<br>MAIN CHARACTER.</h2><button class="btn primary" (click)="go('/visualizer')">TRY THE VISUALIZER</button></div></section>
 `,
})
export class HomeComponent {
 rooms=[{name:'Living Room',tag:'Warm + welcoming',icon:'🛋️',color:'#C85C3A'},{name:'Bedroom',tag:'Soft + calm',icon:'🛏️',color:'#B9A6D9'},{name:'Kitchen',tag:'Fresh + bright',icon:'🍋',color:'#F6B51D'},{name:'Balcony',tag:'Earth + green',icon:'🌿',color:'#5C8D45'}];
 constructor(private router:Router){}
 go(p:string){this.router.navigateByUrl(p);}
}
