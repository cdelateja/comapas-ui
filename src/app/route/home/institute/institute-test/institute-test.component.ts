import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CriterionService} from "../../../../services/criterion.service";
import {ConfigurationService} from "../../../../services/configuration.service";
import {ClientService, Response} from "cdelateja";
import {Subscription} from "rxjs";
import {toConfig} from "../../../../common/functions/functions";
import {Config, Criterion, FormConfig, Institute, TestReq} from "../../../../dto/class.definition";
import {InstituteCriterionCardComponent} from "./institute-criterion-card/institute-criterion-card.component";
import {InstituteService} from "../../../../services/institute.service";
import {FileService} from "../../../../services/file.service";

@Component({
  selector: 'app-institute-test',
  templateUrl: './institute-test.component.html',
  styleUrls: ['./institute-test.component.scss']
})
export class InstituteTestComponent implements OnInit, OnDestroy {

  @ViewChildren(InstituteCriterionCardComponent)
  private cards: QueryList<InstituteCriterionCardComponent>;

  public PREFIX = 'Components.Structure.Institute.Test';

  public config: Config;
  public institute: Institute;
  private idInstitute: number;
  private subscriptions: Subscription[] = [];
  public criterionList: Criterion[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private criterionService: CriterionService,
              private instituteService: InstituteService,
              private fileService: FileService,
              private configurationService: ConfigurationService) {
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
        this.findConfiguration();
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


  private findConfiguration(): void {
    this.subscriptions.push(
      this.configurationService.findByName('FORM').subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.config = toConfig(response.result);
        }
        this.findAllCriterion();
      })
    );
  }

  private findAllCriterion(): void {
    this.subscriptions.push(
      this.criterionService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.listByConfig(response.result);
        }
      })
    );
  }

  private listByConfig(criterionList: Criterion[]) {
    if (this.config) {
      this.config.json.forEach((f: FormConfig) => {
        const criterion = criterionList.find((c: Criterion) => c.idCriterion === f.idCriterion);
        if (criterion) {
          this.criterionList.push(criterion);
        }
      });
    }
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
