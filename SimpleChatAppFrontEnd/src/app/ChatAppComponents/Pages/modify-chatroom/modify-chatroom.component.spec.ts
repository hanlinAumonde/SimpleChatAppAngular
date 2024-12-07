import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyChatroomComponent } from './modify-chatroom.component';

describe('ModifyChatroomComponent', () => {
  let component: ModifyChatroomComponent;
  let fixture: ComponentFixture<ModifyChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyChatroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
