import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomlistComponent } from './chatroomlist.component';

describe('ChatroomlistComponent', () => {
  let component: ChatroomlistComponent;
  let fixture: ComponentFixture<ChatroomlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatroomlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
