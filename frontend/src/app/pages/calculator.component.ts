import { Component } from '@angular/core';
@Component({
 selector:'app-calculator',
 template:`
 <section class="page wrap">
  <div class="page-title"><small>05 / CALCULATOR</small><h1>HOW MUCH<br><span>PAINT?</span></h1><p>Estimate litres and cost before you order.</p></div>
  <div class="calc-grid">
   <div class="calc-card">
    <label>Room length (ft)<input type="number" [(ngModel)]="length"></label>
    <label>Room width (ft)<input type="number" [(ngModel)]="width"></label>
    <label>Wall height (ft)<input type="number" [(ngModel)]="height"></label>
    <label>Doors (count)<input type="number" [(ngModel)]="doors"></label>
    <label>Windows (count)<input type="number" [(ngModel)]="windows"></label>
    <label>Coats<select [(ngModel)]="coats"><option [value]="1">1</option><option [value]="2">2</option><option [value]="3">3</option></select></label>
   </div>
   <div class="result-card">
    <small>ESTIMATE</small><div class="big">{{litres() | number:'1.0-1'}} L</div>
    <p>Recommended paint</p><hr><strong>₹{{cost() | number}}</strong><p>Estimated paint cost</p>
    <div class="can-row"><span *ngFor="let n of cans()">{{n}}L CAN</span></div>
    <small>Calculation uses approximately 110 sq.ft/L/coat and deducts door/window area.</small>
   </div>
  </div>
 </section>`
})
export class CalculatorComponent {
 length=12;width=10;height=10;doors=1;windows=2;coats=2;
 area(){return Math.max(0,2*(this.length+this.width)*this.height-this.doors*21-this.windows*15);}
 litres(){return this.area()*Number(this.coats)/110;}
 cost(){return Math.ceil(this.litres())*850;}
 cans(){let n=Math.ceil(this.litres());const out:number[]=[];while(n>=20){out.push(20);n-=20;}while(n>=10){out.push(10);n-=10;}while(n>=4){out.push(4);n-=4;}if(n>0)out.push(1);return out;}
}
