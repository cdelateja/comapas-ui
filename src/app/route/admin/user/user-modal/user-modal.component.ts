import {Component, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from "cdelateja";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../../services/user.service";
import {User, UserReq} from "../../../../dto/class.definition";

declare var $: any;

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['username', 'password', 'email'])
  ],
  object: new UserReq()
})
export class UserModalComponent extends AbstractValidator implements OnInit {

  constructor(private userService: UserService,
              protected translate: TranslateService) {
    super(translate);
    this.subscriptions.push(
      this.userService.openModalObs().subscribe((user: User) => {
        this.setUser(user)
        this.toggle();
      }));
  }

  ngOnInit(): void {
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
      this.subscriptions.push(
        this.userService.save(userReq).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.userService.sendRefreshList(response.result);
            this.toggle();
          }
        }));
    }
  }

}
