import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPasswordComponent } from './card-password.component';

describe('CardPasswordComponent', () => {
  let component: CardPasswordComponent;
  let fixture: ComponentFixture<CardPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
