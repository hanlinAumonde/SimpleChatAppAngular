import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedChatroomsListComponent } from './owned-chatrooms-list.component';

describe('OwnedChatroomsListComponent', () => {
  let component: OwnedChatroomsListComponent;
  let fixture: ComponentFixture<OwnedChatroomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnedChatroomsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnedChatroomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
