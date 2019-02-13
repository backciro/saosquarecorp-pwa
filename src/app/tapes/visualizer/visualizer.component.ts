import { Component, OnInit, Input, Output, EventEmitter, NgZone } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { ViewChild, ElementRef } from "@angular/core";

import {
  animation,
  state,
  style,
  animate,
  trigger,
  transition,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-visualizer",
  templateUrl: "./visualizer.component.html",
  styleUrls: ["./visualizer.component.scss"],
  animations: [
    trigger("equalize", [
      state(
        "open",
        style({
          display: "none"
        })
      ),
      state(
        "closed",
        style({
          display: "block"
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
      transition("* => closed", [animate("1s")]),
      transition("* => open", [animate("0.5s")]),
      transition("open <=> closed", [animate("0.5s")]),
      transition("* => open", [animate("1s", style({ opacity: "*" }))]),
      transition("* => *", [animate("1s")])
    ])
  ]
})
export class VisualizerComponent implements OnInit {

  constructor(private sanitization: DomSanitizer, public ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => { this.draw });
    });
  }

  public res: SafeStyle;

  @ViewChild("oscillator") oscillator: ElementRef;
  public ctx: CanvasRenderingContext2D;

  @Output() animationChange = new EventEmitter()

  @Input() public waveForm: Float32Array;
  @Input() isPlaying: boolean;

  ngOnInit() {
    this.ctx = (this.oscillator.nativeElement as HTMLCanvasElement).getContext("2d");
  }

  draw(waveform?) {
    requestAnimationFrame(this.draw.bind(this));

    if (this.oscillator && this.ctx && this.waveForm) {

      this.animationChange.emit(null);

      this.oscillator.nativeElement.width = this.waveForm.length;
      this.oscillator.nativeElement.height = 200;

      this.ctx.clearRect(0, 0, this.oscillator.nativeElement.width, this.oscillator.nativeElement.height);
      this.ctx.beginPath();

      for (let i = 0; i < this.waveForm.length; i++) {
        const x = i;
        const y = (0.5 + this.waveForm[i] / 2) * this.oscillator.nativeElement.height;

        if (i == 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.strokeStyle = '#95FF6B';
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
    }
  }
}
