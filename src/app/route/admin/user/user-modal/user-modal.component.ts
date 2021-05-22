import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, NotNull, Response} from "cdelateja";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../../services/user.service";
import {Company, Role, User, UserReq} from "../../../../dto/class.definition";
import {RoleService} from "../../../../services/role.service";

declare var $: any;

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['username', 'email', 'password']),
    NotNull.generate(['role'])
  ],
  object: new UserReq()
})
export class UserModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.User.Modal';

  @Input()
  public company: Company;

  @Input()
  public refresh: EventEmitter<User> = new EventEmitter();

  @Input()
  public open: EventEmitter<User> = new EventEmitter();

  public roles: Role[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe((user: User) => {
        this.setUser(user)
        this.toggle();
      }));
    this.subscriptions.push(
      this.roleService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          response.result.forEach(e => {
            const role = new Role();
            Object.assign(role, e);
            this.roles.push(role);
          });
        }
      })
    );
    this.disableField('id')
  }

  public close() {
    $('#userModal').modal('toggle');
  }

  private toggle() {
    $('#userModal').modal('toggle');
  }

  public setUser(user: User) {
    const userReq: UserReq = new UserReq();
    userReq.id = user.id ? user.id : 0;
    userReq.username = user.username;
    userReq.email = user.email;
    userReq.password = user.password;
    const role: Role = new Role();
    role.idRole = user.idRole
    userReq.role = role;
    this.reset(userReq);
    if (user.id) {
      this.disableField('password')
    } else {
      this.enabledField('password')
    }
  }

  public save() {
    if (this.validateForm()) {
      const userReq: UserReq = this.formGroup.getRawValue();
      userReq.idRole = userReq.role.idRole;
      userReq.idCompany = this.company.idCompany;
      this.subscriptions.push(
        this.userService.save(userReq).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.refresh.next(response.result);
            this.toggle();
          }
        }));
    }
  }
}
