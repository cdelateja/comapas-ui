import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CriterionService} from "../../../../services/criterion.service";
import {ClientService, Response} from "cdelateja";
import {Subscription} from "rxjs";
import {Category, Criterion, Institute, TestReq} from "../../../../dto/class.definition";
import {InstituteCriterionCardComponent} from "./institute-criterion-card/institute-criterion-card.component";
import {InstituteService} from "../../../../services/institute.service";
import {FileService} from "../../../../services/file.service";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-institute-test',
  templateUrl: './institute-test.component.html',
  styleUrls: ['./institute-test.component.scss']
})
export class InstituteTestComponent implements OnInit, OnDestroy {

  @ViewChildren(InstituteCriterionCardComponent)
  private cards: QueryList<InstituteCriterionCardComponent>;

  public PREFIX = 'Components.Structure.Institute.Test';

  public institute: Institute;
  private idInstitute: number;
  private subscriptions: Subscription[] = [];
  public categories: Category[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private criterionService: CriterionService,
              private instituteService: InstituteService,
              private fileService: FileService,
              private categoryService: CategoryService) {
    this.route.params.subscribe(params => this.idInstitute = params.id);
    if (!this.idInstitute) {
      this.router.navigateByUrl('/comapas/home').then();
    }
  }

  ngOnInit(): void {
    this.findInstitute();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findInstitute(): void {
    this.subscriptions.push(
      this.instituteService.find(this.idInstitute).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.institute = response.result;
          this.findFiles();
        }
        this.findAllCategory();
      })
    );
  }

  private findFiles(): void {
    this.subscriptions.push(
      this.fileService.find(this.idInstitute).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.institute.files = response.result;
        }
      })
    );
  }

  private findAllCategory(): void {
    this.subscriptions.push(
      this.categoryService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.categories = response.result;
        }
      })
    );
  }

  public save() {
    const req: TestReq = new TestReq();
    req.idInstitute = this.idInstitute;
    this.cards.forEach((c: InstituteCriterionCardComponent) => {
      req.criterion.push(c.save());
    });
    this.subscriptions.push(
      this.instituteService.saveTest(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
        }
      })
    );
  }

  public complete() {
    let valid = true;
    const req: TestReq = new TestReq();
    req.idInstitute = this.idInstitute;
    this.cards.forEach((c: InstituteCriterionCardComponent) => {
      if (c.validateForm()) {
        req.criterion.push(c.save());
      } else {
        valid = false;
      }
    });
    if (valid) {
      this.subscriptions.push(
        this.instituteService.saveTest(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
          }
        })
      );
    }
  }
}
