import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailsComponent } from './c-details.component';

describe('CDetailsComponent', () => {
  let component: CDetailsComponent;
  let fixture: ComponentFixture<CDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
