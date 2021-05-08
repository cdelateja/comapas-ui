import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../dto/class.definition';
import {ClientService, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public faPencilAlt = faPencilAlt;
  public faCheck = faCheck;
  public faTimesCircle = faTimesCircle;
  public users: User[] = [];
  public usersCache: User[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {
    this.subscriptions.push(
      this.userService.refreshListObs().subscribe((user: User) => {
        this.findUsers();
      }));
  }

  public ngOnInit(): void {
    this.findUsers();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public findUsers() {
    this.userService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.users = response.result
        this.usersCache = response.result
      }
    });
  }

  public searchByName(word: string) {
    const listUsers: User[] = [];
    if ('' !== word) {
      this.users.forEach(e => {
        if (e.username.toLowerCase().includes(word.toLowerCase())) {
          listUsers.push(e);
        }
      });
      this.users = listUsers;
    } else {
      this.users = this.usersCache;
    }
  }

  public addUser() {
    this.userService.sendOpenModal(new User());
  }

  public editUser(user: User) {
    this.userService.sendOpenModal(user);
  }

}
