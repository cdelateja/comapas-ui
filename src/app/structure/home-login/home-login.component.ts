import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons/faGraduationCap";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit, AfterViewInit {

  public faGraduationCap = faGraduationCap;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

}
