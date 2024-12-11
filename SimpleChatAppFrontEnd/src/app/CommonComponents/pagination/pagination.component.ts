import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }
}
