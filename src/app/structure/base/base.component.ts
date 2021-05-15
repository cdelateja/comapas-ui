import {Component, OnInit} from '@angular/core';
import {faKeyboard} from "@fortawesome/free-solid-svg-icons/faKeyboard";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faObjectGroup} from "@fortawesome/free-solid-svg-icons/faObjectGroup";
import {faToolbox} from "@fortawesome/free-solid-svg-icons/faToolbox";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public faUserShield = faUserShield;
  public faUser = faUsers;
  public faKeyboard = faKeyboard;
  public faObjectGroup = faObjectGroup;
  public faToolbox = faToolbox;


  constructor() { }

  ngOnInit(): void {
  }

}
