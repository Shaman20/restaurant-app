import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendsComponent } from './addfriends.component';

describe('AddfriendsComponent', () => {
  let component: AddfriendsComponent;
  let fixture: ComponentFixture<AddfriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddfriendsComponent]
    });
    fixture = TestBed.createComponent(AddfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
