import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColis } from './manage-colis';

describe('ManageColis', () => {
  let component: ManageColis;
  let fixture: ComponentFixture<ManageColis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageColis],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageColis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
