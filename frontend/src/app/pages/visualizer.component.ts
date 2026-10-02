import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
 selector:'app-visualizer',
 template:`
 <section class="page wrap">
   <div class="page-title"><small>03 / VISUALIZER</small><h1>SEE THE<br><span>COLOUR.</span></h1><p>Upload a room photo, mark a wall polygon, then paint it.</p></div>
   <div class="visualizer-layout">
     <div class="canvas-wrap">
       <canvas #canvas></canvas>
       <div class="canvas-empty" *ngIf="!imageLoaded">Upload a room image to begin</div>
       <div class="compare-label" *ngIf="imageLoaded">{{compare ? 'BEFORE' : 'AFTER'}}</div>
     </div>
     <aside class="tool-panel">
       <label class="upload btn primary"><input type="file" accept="image/png,image/jpeg" (change)="load($event)">UPLOAD ROOM</label>
       <div class="tool-row"><button class="btn" (click)="mode='polygon'">POLYGON</button><button class="btn" (click)="mode='brush'">BRUSH</button></div>
       <label>HEX / RGB<input [(ngModel)]="color" (input)="paint()" placeholder="#C85C3A"></label>
       <div class="swatches"><button *ngFor="let c of swatches" [style.background]="c" (click)="color=c;paint()"></button></div>
       <div class="tool-row"><button class="btn" (click)="undo()">UNDO</button><button class="btn" (click)="redo()">REDO</button></div>
       <div class="tool-row"><button class="btn" (click)="reset()">RESET</button><button class="btn" (click)="compare=!compare">BEFORE / AFTER</button></div>
       <button class="btn primary full" (click)="save()">SAVE PROJECT</button>
       <p class="hint">{{status}}</p>
     </aside>
   </div>
   <div class="steps"><span>1 UPLOAD</span><span>2 SELECT WALL</span><span>3 APPLY SHADE</span><span>4 SAVE</span></div>
 </section>
 `,
})
export class VisualizerComponent {
 @ViewChild('canvas',{static:true}) canvas!:ElementRef<HTMLCanvasElement>;
 ctx!:CanvasRenderingContext2D; img=new Image(); imageLoaded=false; color='#C85C3A'; mode='polygon'; compare=false;
 points:{x:number,y:number}[]=[]; history:string[]=[]; redoStack:string[]=[]; status='Tip: click points around a wall, then apply a colour.';
 swatches=['#C85C3A','#F6B51D','#2457C5','#5C8D45','#F39B8D','#E9DFC9','#B9A6D9','#653D78'];
 constructor(private api:ApiService,private auth:AuthService){}
 ngAfterViewInit(){this.ctx=this.canvas.nativeElement.getContext('2d')!;this.resize();}
 resize(){this.canvas.nativeElement.width=900;this.canvas.nativeElement.height=560;this.ctx.fillStyle='#ddd';this.ctx.fillRect(0,0,900,560);}
 load(e:any){
   const file=e.target.files?.[0]; if(!file)return;
   if(file.size>5*1024*1024){this.status='Image must be under 5MB';return;}
   const reader=new FileReader(); reader.onload=()=>{this.img.onload=()=>{this.imageLoaded=true;this.points=[];this.history=[];this.redoStack=[];this.draw();};this.img.src=String(reader.result);}; reader.readAsDataURL(file);
 }
 draw(){
   const c=this.canvas.nativeElement; this.ctx.clearRect(0,0,c.width,c.height);
   const ratio=Math.min(c.width/this.img.width,c.height/this.img.height); const w=this.img.width*ratio,h=this.img.height*ratio;
   const x=(c.width-w)/2,y=(c.height-h)/2; this.ctx.drawImage(this.img,x,y,w,h);
   if(!this.compare && this.points.length>=3){
     this.ctx.save();this.ctx.beginPath();this.points.forEach((p,i)=>i?this.ctx.lineTo(p.x,p.y):this.ctx.moveTo(p.x,p.y));this.ctx.closePath();
     this.ctx.globalAlpha=.58;this.ctx.fillStyle=this.validColor();this.ctx.fill();this.ctx.globalAlpha=1;this.ctx.lineWidth=4;this.ctx.strokeStyle='#111';this.ctx.stroke();this.ctx.restore();
   }
   this.points.forEach(p=>{this.ctx.fillStyle='#111';this.ctx.beginPath();this.ctx.arc(p.x,p.y,6,0,Math.PI*2);this.ctx.fill();});
 }
 validColor(){return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(this.color)?this.color:'#C85C3A';}
 paint(){if(this.imageLoaded)this.draw();}
 undo(){if(this.points.length){this.redoStack.push(JSON.stringify(this.points));this.points.pop();this.draw();}}
 redo(){const p=this.redoStack.pop();if(p){this.points=JSON.parse(p);this.draw();}}
 reset(){this.points=[];this.redoStack=[];this.compare=false;this.draw();}
 save(){
   if(!this.auth.user()){this.status='Please login to save a project.';return;}
   this.api.post('/projects',{name:'My Visual Room',walls:[{points:this.points,color:this.validColor()}]}).subscribe({next:()=>this.status='Project saved!',error:()=>this.status='Could not save project.'});
 }
}
