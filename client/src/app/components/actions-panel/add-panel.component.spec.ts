import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanelComponent } from './add-panel.component';

describe('ActionsPanelComponent', () => {
  let component: AddPanelComponent;
  let fixture: ComponentFixture<AddPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
