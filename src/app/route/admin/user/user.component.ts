import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Company, IdReq, Role, User} from '../../../dto/class.definition';
import {AbstractComponent, ClientService, ConfirmationDialog, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import {RoleService} from "../../../services/role.service";
import {TranslateService} from "@ngx-translate/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public PREFIX = 'Components.Structure.User';

  public displayedColumns: string[] = ['id', 'username', 'email', 'ip', 'role', 'active', 'edit'];
  public faPencilAlt = faPencilAlt;
  public faCheck = faCheck;
  public faTimesCircle = faTimesCircle;
  public users: User[] = [];
  private subscriptions: Subscription[] = [];
  public roles: Role[] = [];
  private user: User;
  public company: Company;
  public dataSource = new MatTableDataSource<User>(this.users);
  public refresh: EventEmitter<User> = new EventEmitter();
  public open: EventEmitter<User> = new EventEmitter()

  constructor(private userService: UserService,
              private roleService: RoleService,
              protected translate: TranslateService,
              private companyService: CompanyService,
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
            this.refreshUser(response.result);
          }
        });
      })
    );
  }

  public ngOnInit(): void {
    this.refresh.subscribe((user: User) => {
      this.refreshUser(user);
    });
    this.findInnerCompany();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public findInnerCompany() {
    this.subscriptions.push(
      this.companyService.findInner().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.company = response.result;
          this.findUsers(this.company.idCompany);
        }
      })
    );
  }

  public findUsers(idCompany: number) {
    this.userService.findByIdCompany(idCompany).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.users = response.result
        this.dataSource.data = this.users;
      }
    });
  }

  public searchByWord(word: string) {
    this.dataSource.filter = word;
  }

  public addUser() {
    this.open.next(new User());
  }

  public editUser(user: User) {
    this.open.next(user);
  }

  public refreshUser(user: User) {
    const foundUser = this.dataSource.data.find((u: User) => u.id === user.id);
    if (foundUser) {
      foundUser.active = user.active;
      foundUser.username = user.username;
      foundUser.idRole = user.idRole;
      foundUser.email = user.email;
    } else {
      this.users.push(user);
      this.dataSource.data = this.users;
    }
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

}
