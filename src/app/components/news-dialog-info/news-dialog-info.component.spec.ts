import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDialogInfoComponent } from './news-dialog-info.component';

describe('NewsDialogInfoComponent', () => {
  let component: NewsDialogInfoComponent;
  let fixture: ComponentFixture<NewsDialogInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDialogInfoComponent],
    });
    fixture = TestBed.createComponent(NewsDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
