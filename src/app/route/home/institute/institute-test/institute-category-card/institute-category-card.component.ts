import {Component, Input, OnInit} from '@angular/core';
import {Category, Institute} from "../../../../../dto/class.definition";

@Component({
  selector: 'app-institute-category-card',
  templateUrl: './institute-category-card.component.html',
  styleUrls: ['./institute-category-card.component.scss']
})
export class InstituteCategoryCardComponent implements OnInit {

  @Input()
  public category: Category = new Category();

  @Input()
  public institute: Institute;

  constructor() { }

  ngOnInit(): void {
  }

}
