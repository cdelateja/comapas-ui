import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DynamicField, FieldFile} from "../../../dto/class.definition";
import {ClientService, OauthService, Progress, Response} from "cdelateja";
import {FileService} from "../../../services/file.service";
import {ObservableService} from "../../../services/observable.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input()
  public field: DynamicField;

  public file: FieldFile = new FieldFile();

  private subscriptions: Subscription[] = [];
  public progress: any;
  public error: string;

  constructor(private oauthService: OauthService,
              private fileService: FileService,
              private observableService: ObservableService) {
  }

  ngOnInit(): void {
    this.progress = 0;
    if (this.field.file) {
      this.file = this.field.file;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public uploadFile(event) {
    if (event.target.files.length > 0) {
      Array.from(event.target.files).forEach((f: any) => {
        this.sendUploadFile(f);
      });
    }
  }

  private sendUploadFile(f: any) {
    const file: any = f;
    const formData = new FormData();
    formData.append('file', file, f.name);
    formData.append('idField', this.field.idField.toString());
    formData.append('idInstitute', this.oauthService.getUser().idCompany.toString());
    this.subscriptions.push(
      this.fileService.uploadFile(formData).subscribe(
        (res: any) => {
          if (res instanceof Progress) {
            this.progress = res.progress;
          } else if (res.responseStatus) {
            if (ClientService.validateData(res)) {
              this.file = res.result;
            }
          }
        },
        (err) => this.error = err
      )
    );
  }

  public viewFile() {
    this.observableService.nextOpenModalViewFile(this.file)
  }

}
