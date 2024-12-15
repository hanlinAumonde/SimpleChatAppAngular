import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInChatroomListComponent } from './user-in-chatroom-list.component';

describe('UserInChatroomListComponent', () => {
  let component: UserInChatroomListComponent;
  let fixture: ComponentFixture<UserInChatroomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInChatroomListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInChatroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
