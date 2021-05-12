import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {IdReq, Role, User} from '../../../dto/class.definition';
import {ClientService, ConfirmationDialog, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import {RoleService} from "../../../services/role.service";
import {TranslateService} from "@ngx-translate/core";

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
  public roles: Role[] = [];
  private user: User;

  public open: EventEmitter<User> = new EventEmitter()

  constructor(private userService: UserService,
              private roleService: RoleService,
              protected translate: TranslateService,
              private confirmationDialog: ConfirmationDialog) {
    this.subscriptions.push(
      this.roleService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.roles = response.result
        }
      })
    )
    this.subscriptions.push(
      this.confirmationDialog.getYesConfirmation().subscribe(() => {
        const req: IdReq = new IdReq();
        req.id = this.user.id;
        this.userService.changeStatus(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.findUsers();
          }
        });
      })
    );
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
    this.open.next(new User());
  }

  public editUser(user: User) {
    this.open.next(user);
  }

  public getRole(idRole: number): string {
    const role = this.roles.find(r => r.idRole === idRole);
    if (role) {
      return role.name;
    }
    return '';
  }

  public changeActive(user: User) {
    this.user = user;
    this.confirmationDialog.createConfirmation(
      this.translate.instant('Components.Structure.User.attention'),
      user.active ?
        this.translate.instant('Components.Structure.User.deactivate')
        :
        this.translate.instant('Components.Structure.User.activate')
    );
  }

  public refresh(): void {
    this.findUsers();
  }

}
