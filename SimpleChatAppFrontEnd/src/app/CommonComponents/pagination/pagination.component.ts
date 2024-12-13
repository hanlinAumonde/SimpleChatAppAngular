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

  handlePageChange(event: Event, page: number): void {
    event.preventDefault();
    this.onPageChange(page);
  }

  rangeOfPages(): number[] {
    let pages: number[] = [];
    if(this.totalPages >= 3){
      if(this.currentPage === 0){
        pages = [1, 2, 3];
      } else if(this.currentPage === this.totalPages - 1){
        pages = [this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
        pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
      }
    }else{
      for(let i = 0; i < this.totalPages; i++){
        pages.push(i+1);
      }
    }
    return pages;
  }
}
