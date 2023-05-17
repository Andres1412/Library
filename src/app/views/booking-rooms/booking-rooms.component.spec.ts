import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRoomsComponent } from './booking-rooms.component';

describe('BookingRoomsComponent', () => {
  let component: BookingRoomsComponent;
  let fixture: ComponentFixture<BookingRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
