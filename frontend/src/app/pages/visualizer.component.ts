import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Point {
  x: number;
  y: number;
}

interface BrushStroke {
  x: number;
  y: number;
  radius: number;
}

interface State {
  points: Point[];
  brushStrokes: BrushStroke[];
}

@Component({
  selector: 'app-visualizer',

  template: `
    <section class="page wrap">

      <div class="page-title">
        <small>03 / VISUALIZER</small>
        <h1>SEE THE<br><span>COLOUR.</span></h1>
        <p>Upload a room photo, mark a wall polygon, then paint it.</p>
      </div>

      <div class="visualizer-layout">

        <div class="canvas-wrap">

          <canvas
            #canvas
            (click)="canvasClick($event)"
            (mousedown)="startBrush($event)"
            (mousemove)="brushMove($event)"
            (mouseup)="endBrush()"
            (mouseleave)="endBrush()">
          </canvas>

          <div class="canvas-empty" *ngIf="!imageLoaded">
            Upload a room image to begin
          </div>

          <div class="compare-label" *ngIf="imageLoaded">
            {{compare ? 'BEFORE' : 'AFTER'}}
          </div>

        </div>

        <aside class="tool-panel">

          <label class="upload btn primary">
            <input
              type="file"
              accept="image/png,image/jpeg"
              (change)="load($event)">
            UPLOAD ROOM
          </label>

          <div class="tool-row">

            <button
              class="btn"
              [class.active]="mode === 'polygon'"
              (click)="setMode('polygon')">
              POLYGON
            </button>

            <button
              class="btn"
              [class.active]="mode === 'brush'"
              (click)="setMode('brush')">
              BRUSH
            </button>

          </div>

          <label>
            HEX / RGB

            <input
              [(ngModel)]="color"
              (input)="paint()"
              placeholder="#C85C3A">
          </label>

          <div class="swatches">

            <button
              *ngFor="let c of swatches"
              [style.background]="c"
              (click)="selectColor(c)">
            </button>

          </div>

          <div class="tool-row">

            <button class="btn" (click)="undo()">
              UNDO
            </button>

            <button class="btn" (click)="redo()">
              REDO
            </button>

          </div>

          <div class="tool-row">

            <button class="btn" (click)="reset()">
              RESET
            </button>

            <button class="btn" (click)="compare=!compare;draw()">
              BEFORE / AFTER
            </button>

          </div>

          <button
            class="btn primary full"
            (click)="save()">
            SAVE PROJECT
          </button>

          <p class="hint">
            {{status}}
          </p>

        </aside>

      </div>

      <div class="steps">
        <span>1 UPLOAD</span>
        <span>2 SELECT WALL</span>
        <span>3 APPLY SHADE</span>
        <span>4 SAVE</span>
      </div>

    </section>
  `
})
export class VisualizerComponent {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  img = new Image();

  imageLoaded = false;

  color = '#C85C3A';

  mode = 'polygon';

  compare = false;

  points: Point[] = [];

  brushStrokes: BrushStroke[] = [];

  history: State[] = [];

  redoStack: State[] = [];

  isDrawing = false;

  status = 'Tip: click points around a wall, then apply a colour.';

  swatches = [
    '#C85C3A',
    '#F6B51D',
    '#2457C5',
    '#5C8D45',
    '#F39B8D',
    '#E9DFC9',
    '#B9A6D9',
    '#653D78'
  ];

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngAfterViewInit() {

    this.ctx =
      this.canvas.nativeElement.getContext('2d')!;

    this.resize();

  }

  resize() {

    this.canvas.nativeElement.width = 900;
    this.canvas.nativeElement.height = 560;

    this.ctx.fillStyle = '#ddd';

    this.ctx.fillRect(
      0,
      0,
      900,
      560
    );

  }

  setMode(mode: string) {

    this.mode = mode;

    if (mode === 'polygon') {

      this.status =
        'POLYGON: click points around the wall.';

    } else {

      this.status =
        'BRUSH: click and drag over the wall.';

    }

  }

  load(event: any) {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {

      this.status =
        'Image must be under 5MB';

      return;

    }

    const reader =
      new FileReader();

    reader.onload = () => {

      this.img.onload = () => {

        this.imageLoaded = true;

        this.points = [];

        this.brushStrokes = [];

        this.history = [];

        this.redoStack = [];

        this.compare = false;

        this.draw();

        this.status =
          'Image loaded. Select POLYGON or BRUSH.';

      };

      this.img.src =
        String(reader.result);

    };

    reader.readAsDataURL(file);

  }

  getMousePosition(
    event: MouseEvent
  ): Point {

    const canvas =
      this.canvas.nativeElement;

    const rect =
      canvas.getBoundingClientRect();

    const scaleX =
      canvas.width / rect.width;

    const scaleY =
      canvas.height / rect.height;

    return {

      x:
        (event.clientX - rect.left) *
        scaleX,

      y:
        (event.clientY - rect.top) *
        scaleY

    };

  }

  canvasClick(event: MouseEvent) {

    if (!this.imageLoaded) {

      this.status =
        'Please upload a room image first.';

      return;

    }

    if (this.mode !== 'polygon') {
      return;
    }

    this.saveHistory();

    const point =
      this.getMousePosition(event);

    this.points.push(point);

    this.status =
      `Polygon point ${this.points.length} added.`;

    this.draw();

  }

  startBrush(event: MouseEvent) {

    if (!this.imageLoaded) {
      return;
    }

    if (this.mode !== 'brush') {
      return;
    }

    this.saveHistory();

    this.isDrawing = true;

    this.addBrushStroke(event);

  }

  brushMove(event: MouseEvent) {

    if (!this.isDrawing) {
      return;
    }

    if (this.mode !== 'brush') {
      return;
    }

    this.addBrushStroke(event);

  }

  endBrush() {

    this.isDrawing = false;

  }

  addBrushStroke(event: MouseEvent) {

    const point =
      this.getMousePosition(event);

    this.brushStrokes.push({

      x: point.x,

      y: point.y,

      radius: 18

    });

    this.draw();

  }

  selectColor(c: string) {

    this.color = c;

    this.paint();

  }

  paint() {

    if (this.imageLoaded) {

      this.draw();

    }

  }

  validColor() {

    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(
      this.color
    )
      ? this.color
      : '#C85C3A';

  }

  draw() {

    if (!this.ctx) {
      return;
    }

    const canvas =
      this.canvas.nativeElement;

    this.ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (!this.imageLoaded) {

      this.ctx.fillStyle = '#ddd';

      this.ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      return;

    }

    const ratio =
      Math.min(
        canvas.width / this.img.width,
        canvas.height / this.img.height
      );

    const w =
      this.img.width * ratio;

    const h =
      this.img.height * ratio;

    const x =
      (canvas.width - w) / 2;

    const y =
      (canvas.height - h) / 2;

    this.ctx.drawImage(
      this.img,
      x,
      y,
      w,
      h
    );

    // Don't show paint when BEFORE is selected
    if (this.compare) {
      return;
    }

    // POLYGON PAINT
    if (this.points.length >= 3) {

      this.ctx.save();

      this.ctx.beginPath();

      this.points.forEach(
        (p, index) => {

          if (index === 0) {

            this.ctx.moveTo(
              p.x,
              p.y
            );

          } else {

            this.ctx.lineTo(
              p.x,
              p.y
            );

          }

        }
      );

      this.ctx.closePath();

      this.ctx.globalAlpha = 0.58;

      this.ctx.fillStyle =
        this.validColor();

      this.ctx.fill();

      this.ctx.globalAlpha = 1;

      this.ctx.lineWidth = 4;

      this.ctx.strokeStyle = '#111';

      this.ctx.stroke();

      this.ctx.restore();

    }

    // BRUSH PAINT
    this.brushStrokes.forEach(
      stroke => {

        this.ctx.save();

        this.ctx.globalAlpha = 0.45;

        this.ctx.fillStyle =
          this.validColor();

        this.ctx.beginPath();

        this.ctx.arc(
          stroke.x,
          stroke.y,
          stroke.radius,
          0,
          Math.PI * 2
        );

        this.ctx.fill();

        this.ctx.restore();

      }
    );

    // POLYGON POINTS
    if (this.mode === 'polygon') {

      this.points.forEach(
        point => {

          this.ctx.fillStyle =
            '#111';

          this.ctx.beginPath();

          this.ctx.arc(
            point.x,
            point.y,
            6,
            0,
            Math.PI * 2
          );

          this.ctx.fill();

        }
      );

    }

  }

  saveHistory() {

    this.history.push({

      points:
        JSON.parse(
          JSON.stringify(this.points)
        ),

      brushStrokes:
        JSON.parse(
          JSON.stringify(this.brushStrokes)
        )

    });

    this.redoStack = [];

  }

  undo() {

    const previous =
      this.history.pop();

    if (!previous) {

      this.status =
        'Nothing to undo.';

      return;

    }

    this.redoStack.push({

      points:
        JSON.parse(
          JSON.stringify(this.points)
        ),

      brushStrokes:
        JSON.parse(
          JSON.stringify(this.brushStrokes)
        )

    });

    this.points =
      previous.points;

    this.brushStrokes =
      previous.brushStrokes;

    this.draw();

  }

  redo() {

    const next =
      this.redoStack.pop();

    if (!next) {

      this.status =
        'Nothing to redo.';

      return;

    }

    this.history.push({

      points:
        JSON.parse(
          JSON.stringify(this.points)
        ),

      brushStrokes:
        JSON.parse(
          JSON.stringify(this.brushStrokes)
        )

    });

    this.points =
      next.points;

    this.brushStrokes =
      next.brushStrokes;

    this.draw();

  }

  reset() {

    this.saveHistory();

    this.points = [];

    this.brushStrokes = [];

    this.compare = false;

    this.draw();

    this.status =
      'Visualizer has been reset.';

  }

  save() {

    if (!this.auth.user()) {

      this.status =
        'Please login to save a project.';

      return;

    }

    this.api.post(
      '/projects',
      {
        name: 'My Visual Room',

        walls: [
          {
            points: this.points,

            brushStrokes:
              this.brushStrokes,

            color:
              this.validColor()
          }
        ]
      }
    ).subscribe({

      next: () => {

        this.status =
          'Project saved!';

      },

      error: () => {

        this.status =
          'Could not save project.';

      }

    });

  }

}