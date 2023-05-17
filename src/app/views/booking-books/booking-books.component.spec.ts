import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBooksComponent } from './booking-books.component';

describe('BookingBooksComponent', () => {
  let component: BookingBooksComponent;
  let fixture: ComponentFixture<BookingBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
