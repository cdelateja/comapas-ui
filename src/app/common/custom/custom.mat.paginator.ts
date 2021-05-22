import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {

  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.itemsPerPageLabel = '';
    this.nextPageLabel = '';
    this.previousPageLabel = '';
    this.changes.next();
  }
}
