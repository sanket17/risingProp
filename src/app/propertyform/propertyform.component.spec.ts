import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyformComponent } from './propertyform.component';

describe('PropertyformComponent', () => {
  let component: PropertyformComponent;
  let fixture: ComponentFixture<PropertyformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
