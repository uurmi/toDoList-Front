import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsDoneModalComponent } from './mark-as-done-modal.component';

describe('MarkAsDoneModalComponent', () => {
  let component: MarkAsDoneModalComponent;
  let fixture: ComponentFixture<MarkAsDoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAsDoneModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkAsDoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
