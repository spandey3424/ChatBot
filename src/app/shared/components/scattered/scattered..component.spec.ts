import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartDemoComponent } from './scattered.component';

describe('HighchartDemoComponent', () => {
  let component: HighchartDemoComponent;
  let fixture: ComponentFixture<HighchartDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighchartDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
