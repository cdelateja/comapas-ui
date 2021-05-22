import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {
  Config,
  ConfigReq,
  Criterion,
  CriterionConfig,
  DynamicField,
  FormConfig,
  FormFieldConfig
} from "../../../dto/class.definition";
import {ClientService, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {CriterionService} from "../../../services/criterion.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from "@fortawesome/free-solid-svg-icons/faGripHorizontal";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss']
})
export class SandBoxComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.SandBox';

  public faGripHorizontal = faGripHorizontal;
  public delete: EventEmitter<CriterionConfig> = new EventEmitter();
  public save: EventEmitter<CriterionConfig> = new EventEmitter();
  public open: EventEmitter<CriterionConfig> = new EventEmitter();
  public refresh: EventEmitter<CriterionConfig> = new EventEmitter();
  public criterionList: CriterionConfig[] = [];
  public criterionCache: CriterionConfig[] = [];
  private subscriptions: Subscription[] = [];
  public selectedCriterion: CriterionConfig[] = [];
  public config: Config;

  constructor(private criterionService: CriterionService,
              private configurationService: ConfigurationService) {
  }

  public ngOnInit(): void {
    this.refresh.subscribe((criterion: CriterionConfig) => {
      this.pushCriterion(criterion);
    });
    this.delete.subscribe((criterion: CriterionConfig) => {
      this.removeCriterion(criterion);
    });
    this.save.subscribe(() => {
      this.saveConfig();
    });
    this.subscriptions.push(
      this.configurationService.findByName('FORM').subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.config = this.toConfig(response.result);
        }
        this.findAll();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public addCriterion() {
    this.open.next(new CriterionConfig());
  }

  private removeCriterion(criterion: CriterionConfig) {
    this.selectedCriterion.forEach((value: Criterion, index: number) => {
      if (value.idCriterion == criterion.idCriterion) this.selectedCriterion.splice(index, 1);
    });
    this.criterionList.push(criterion);
  }

  private pushCriterion(criterion: CriterionConfig) {
    this.criterionList.forEach((value: Criterion, index: number) => {
      if (value.idCriterion == criterion.idCriterion) this.criterionList.splice(index, 1);
    });
    this.selectedCriterion.push(criterion);
  }

  private findAll(): void {
    this.subscriptions.push(
      this.criterionService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.listByConfig(response.result);
        }
      })
    )
  }

  private listByConfig(criterionList: CriterionConfig[]) {
    this.criterionList = criterionList;
    this.criterionCache = criterionList;
    if (this.config) {
      this.config.json.forEach((f: FormConfig) => {
        const criterion = criterionList.find((c: CriterionConfig) => c.idCriterion === f.idCriterion);
        if(criterion){
          this.pushCriterion(criterion)
        }
      });
    }
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.selectedCriterion, event.previousIndex, event.currentIndex);
    this.saveConfig();
  }

  public saveConfig() {
    const config: FormConfig[] = [];
    this.selectedCriterion.forEach((criterion: CriterionConfig) => {
      const formConfig: FormConfig = new FormConfig();
      formConfig.idCriterion = criterion.idCriterion;
      criterion.dynamicFields.forEach((f: DynamicField) => {
        const formFieldConfig: FormFieldConfig = new FormFieldConfig();
        formFieldConfig.idField = f.idField;
        formConfig.fields.push(formFieldConfig);
      });
      config.push(formConfig);
    });
    const req: ConfigReq = new ConfigReq();
    req.name = 'FORM';
    req.idFormConfig = this.config.idFormConfig;
    req.json = JSON.stringify(config);
    this.subscriptions.push(
      this.configurationService.save(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.config = this.toConfig(response.result);
        }
      })
    );
  }

  private toConfig(req: ConfigReq): Config {
    const config: Config = new Config();
    config.idFormConfig = req.idFormConfig;
    config.name = req.name;
    config.json = JSON.parse(req.json);
    return config;
  }

}
