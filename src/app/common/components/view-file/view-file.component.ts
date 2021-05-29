import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonType} from 'cdelateja';
import {ObservableService} from "../../../services/observable.service";
import {Subscription} from "rxjs";
import {FieldFile} from "../../../dto/class.definition";
import {FileService} from "../../../services/file.service";

declare var $: any;

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Common.ViewFile';
  public readonly ButtonType = new ButtonType();
  private subscriptions: Subscription[] = [];
  public blobData: any;
  public file: FieldFile = new FieldFile();

  constructor(private observableService: ObservableService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.observableService.obsOpenModalViewFile().subscribe((file: FieldFile) => {
        this.findContent(file);
        this.toggle();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public close() {
    $('#viewFileModal').modal('toggle');
  }

  public toggle() {
    $('#viewFileModal').modal('toggle');
  }

  private findContent(file: FieldFile) {
    this.file = file;
    this.subscriptions.push(
      this.fileService.findFieldFile(file.idInstitute, file.idField).subscribe((data: Blob) => {
        this.toType(data)
      })
    )
  }

  private toType(data: Blob) {
    switch (this.file.contentType) {
      case 'image/png':
      case 'application/pdf':
        this.blobData = URL.createObjectURL(data);
        break
    }
  }

}
