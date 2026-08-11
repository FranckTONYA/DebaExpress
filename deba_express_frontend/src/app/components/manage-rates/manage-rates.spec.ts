import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRates } from './manage-rates';

describe('ManageRates', () => {
  let component: ManageRates;
  let fixture: ComponentFixture<ManageRates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRates],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageRates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
