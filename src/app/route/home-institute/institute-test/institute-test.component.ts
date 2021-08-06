import {Component, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CriterionService} from "../../../services/criterion.service";
import {BaseComponent, ClientService, Response} from "cdelateja";
import {Category, Institute, TestReq} from "../../../dto/class.definition";
import {InstituteService} from "../../../services/institute.service";
import {FileService} from "../../../services/file.service";
import {CategoryService} from "../../../services/category.service";
import {InstituteCategoryCardComponent} from "./institute-category-card/institute-category-card.component";

declare var $: any;

@Component({
  selector: 'app-institute-test',
  templateUrl: './institute-test.component.html',
  styleUrls: ['./institute-test.component.scss']
})
export class InstituteTestComponent extends BaseComponent {

  @ViewChildren(InstituteCategoryCardComponent)
  private cards: QueryList<InstituteCategoryCardComponent>;

  public PREFIX = 'Components.Structure.Institute.Test';

  public institute: Institute;
  private idInstitute: number;
  public categories: Category[] = [];
  public currentSection = 'section1';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private criterionService: CriterionService,
              private instituteService: InstituteService,
              private fileService: FileService,
              private categoryService: CategoryService) {
    super();
    this.route.params.subscribe(params => this.idInstitute = params.id);
    if (!this.idInstitute) {
      this.router.navigateByUrl('/comapas/home').then();
    }
  }

  ngOnInit(): void {
    this.findInstitute();
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  private findInstitute(): void {
    this.instituteService.find(this.idInstitute).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.institute = response.result;
        this.findFiles();
      }
      this.findAllCategory();
    });
  }

  private findFiles(): void {
    this.pushSubscription(
      this.fileService.find(this.idInstitute).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.institute.files = response.result;
        }
      })
    );
  }

  private findAllCategory(): void {
    this.categoryService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.categories = response.result;
        this.currentSection = 'cat' + this.categories[0].idCategory
      }
    });
  }

  public save() {
    const req: TestReq = new TestReq();
    req.idInstitute = this.idInstitute;
    this.cards.forEach((c: InstituteCategoryCardComponent) => {
      c.save(req);
    });
    this.instituteService.saveTest(req).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
      }
    });
  }

  public complete() {
    let valid = true;
    const req: TestReq = new TestReq();
    req.idInstitute = this.idInstitute;
    this.cards.forEach((c: InstituteCategoryCardComponent) => {
      if (!c.complete(req)) {
        valid = false;
      }
    });
    if (valid) {
      this.instituteService.saveTest(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
        }
      });
    }
  }

  public onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  public scrollTo(section) {
    document.querySelector('#cat' + section)
      .scrollIntoView();
  }
}
