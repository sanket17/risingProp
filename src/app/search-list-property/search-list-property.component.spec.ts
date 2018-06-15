import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListPropertyComponent } from './search-list-property.component';

describe('SearchListPropertyComponent', () => {
  let component: SearchListPropertyComponent;
  let fixture: ComponentFixture<SearchListPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchListPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
