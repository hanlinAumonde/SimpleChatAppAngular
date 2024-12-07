import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatroomComponent } from './create-chatroom.component';

describe('CreateChatroomComponent', () => {
  let component: CreateChatroomComponent;
  let fixture: ComponentFixture<CreateChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChatroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
