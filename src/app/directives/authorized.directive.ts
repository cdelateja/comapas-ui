import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {OauthService} from 'cdelateja';

@Directive({
  selector: '[appAuthorized]'
})
export class AuthorizedDirective implements OnInit {

  @Input()
  public appAuthorized: string;

  constructor(private elementRef: ElementRef, private oauthService: OauthService) {
  }

  public ngOnInit(): void {
    if (!this.oauthService.hasRole(this.appAuthorized)) {
      this.elementRef.nativeElement.remove();
    }
  }
}
