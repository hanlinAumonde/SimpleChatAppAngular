import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedChatroomsListComponent } from './joined-chatrooms-list.component';

describe('JoinedChatroomsListComponent', () => {
  let component: JoinedChatroomsListComponent;
  let fixture: ComponentFixture<JoinedChatroomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinedChatroomsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedChatroomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
