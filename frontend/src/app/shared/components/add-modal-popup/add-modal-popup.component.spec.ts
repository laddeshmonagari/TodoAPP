import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalPopupComponent } from './add-modal-popup.component';

describe('AddModalPopupComponent', () => {
  let component: AddModalPopupComponent;
  let fixture: ComponentFixture<AddModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModalPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
