import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService, LoginComponent, NotificationPop} from 'cdelateja';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit, AfterViewInit {

  @ViewChild(LoginComponent, {static: false})
  private loginComponent: LoginComponent;


  constructor(protected notification: NotificationPop,
              private configService: ConfigService,
              private router: Router) {
    console.log(configService.get('servers.oauth.url'))
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.loginComponent.getAuthentication().subscribe(authenticated => {
      if (authenticated) {
        this.router.navigateByUrl('/instrumentos/buscar-instrumento');
      } else {
        this.notification.showError('Usuario y/o password incorrectos');
      }
    });
  }

}
