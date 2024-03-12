/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserQueryComponent } from './user-query.component';

describe('UserQueryComponent', () => {
  let component: UserQueryComponent;
  let fixture: ComponentFixture<UserQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
