import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[scrollSpy]'
})
export class ScrollSpyDirective {

  @Input()
  public className: string;
  @Output()
  public sectionChange = new EventEmitter<string>();

  private currentSection: string;
  private parentOffset: number;
  private spiedElements: HTMLCollectionOf<Element>;
  private readonly elements: HTMLElement[] = [];

  constructor(private _el: ElementRef) {
  }

  private init(): void {
    this.parentOffset = this._el.nativeElement.offsetTop + 100;
    this.spiedElements = document.getElementsByClassName(this.className);
    Array.from(this.spiedElements).forEach((e: Element) => {
      const element: HTMLElement = document.getElementById(e.id);
      this.elements.push(element);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let currentSection: string;
    const scrollTop = window.pageYOffset;
    if (this.elements.length === 0) {
      this.init();
    }
    this.elements.forEach((element: HTMLElement) => {
      if ((element.offsetTop - this.parentOffset) <= scrollTop) {
        currentSection = element.id;
      }
    });
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }

}
