import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from 'cdelateja';
import {Category, CategoryReq} from '../../../../dto/class.definition';
import {TranslateService} from '@ngx-translate/core';
import {CategoryService} from "../../../../services/category.service";

declare var $: any;

@Component({
  selector: 'app-sand-box-category-modal',
  templateUrl: './sand-box-category-modal.component.html',
  styleUrls: ['./sand-box-category-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['name'])
  ],
  object: new CategoryReq()
})
export class SandBoxCategoryModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.SandBox.CategoryModal';

  @Input()
  public open: EventEmitter<Category>;

  @Input()
  public refresh: EventEmitter<Category>;

  constructor(protected translate: TranslateService,
              private categoryService: CategoryService) {
    super(translate);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe((category: Category) => {
        this.setCategory(category);
        this.toggle();
      })
    );
  }

  public setCategory(category: Category) {
    const categoryReq: CategoryReq = new CategoryReq();
    categoryReq.idCategory = category.idCategory;
    categoryReq.name = category.name;
    this.reset(categoryReq);
  }

  public close(): void {
    this.toggle();
  }

  private toggle(): void {
    $('#CategoryModal').modal('toggle');
  }

  public save(): void {
    if (this.validateForm()) {
      const req: CategoryReq = this.formGroup.getRawValue();
      this.categoryService.saveCategory(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.refresh.next(response.result);
            this.toggle();
          }
        }
      );
    }
  }

}
