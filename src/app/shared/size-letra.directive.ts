import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, input } from '@angular/core';

@Directive({
    selector: '[appSizeLetra]',
    standalone: true
})
export default class SizeLetraDirective implements OnChanges {
  @Input()
  size = '20px';
  

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.size)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.size)
  }

}
