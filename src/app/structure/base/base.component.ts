import {Component, OnInit} from '@angular/core';
import {faKeyboard} from "@fortawesome/free-solid-svg-icons/faKeyboard";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public faUserShield = faUserShield;
  public faUser = faUser;
  public faKeyboard = faKeyboard;


  constructor() { }

  ngOnInit(): void {
  }

}
