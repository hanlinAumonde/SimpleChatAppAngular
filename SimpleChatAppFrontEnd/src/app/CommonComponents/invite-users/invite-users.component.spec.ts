import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUsersComponent } from './invite-users.component';

describe('InviteUsersComponent', () => {
  let component: InviteUsersComponent;
  let fixture: ComponentFixture<InviteUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
