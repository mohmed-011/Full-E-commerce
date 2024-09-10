import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BDetailsComponent } from './b-details.component';

describe('BDetailsComponent', () => {
  let component: BDetailsComponent;
  let fixture: ComponentFixture<BDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
