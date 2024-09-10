import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalisComponent } from './detalis.component';

describe('DetalisComponent', () => {
  let component: DetalisComponent;
  let fixture: ComponentFixture<DetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
