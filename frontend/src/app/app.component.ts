import { Component } from '@angular/core';
@Component({
  selector:'app-root',
  template:`<div class="bucket-cursor" [style.left.px]="x" [style.top.px]="y">🪣</div><app-navbar></app-navbar><main><router-outlet></router-outlet></main>`,
  styles:[`
    .bucket-cursor{position:fixed;z-index:9999;pointer-events:none;font-size:24px;transform:translate(-10px,-10px);filter:drop-shadow(3px 3px 0 #111)}
  `]
})
export class AppComponent {
  x=0;y=0;
  constructor(){
    window.addEventListener('mousemove',(e)=>{this.x=e.clientX;this.y=e.clientY});
  }
}
