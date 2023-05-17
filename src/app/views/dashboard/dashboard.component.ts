import { Component } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { SalasService } from 'src/app/services/salas.service';

interface Day {
  number: number | null;
  isCurrentMonth: boolean;
  otherMonth?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  year: number;
  month: number;
  weeks: Day[][] = [];

  constructor(private getBookingLibro: LibrosService, private getBookingSala: SalasService) {   
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
  }

  public arrayReservas : {usuarioNombre:string, libroNombre: string, cantidad:number, fechaReserva: string, fechaDevolucion:string}[] = [
    
  ];

  public arrayReservaSalas : {numeroSala:number, fechaReservaSala: string, horario:string}[] = [
    
  ];

  get monthName() {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[this.month - 1];
  }

  ngOnInit() {

    //localStorage.removeItem("user");

    this.generateCalendar();

    this.getBookingLibro.getBookingLibro().subscribe((response)=>{
      for (let i = 0; i < response.reservas.length; i++) {
        let arrayLibros : {usuarioNombre:string, libroNombre: string, cantidad:number, fechaReserva: string, fechaDevolucion:string} = {
        usuarioNombre:         response.reservas[i].NOMBRE_USUARIO,
        libroNombre:           response.reservas[i].NOMBRE_LIBRO,
        cantidad:              response.reservas[i].CANTIDAD,
        fechaReserva:          response.reservas[i].FECHA_RESERVA,
        fechaDevolucion:       response.reservas[i].FECHA_DEVOLUCION
        };
        this.arrayReservas.push(arrayLibros);        
      }
    });
     
    this.getBookingSala.getBookingSala().subscribe((response)=>{

      console.log(response);
      
            
      for (let i = 0; i < response.reservas.length; i++) {
        let arraySalas : {numeroSala:number, fechaReservaSala: string, horario:string} = {
        numeroSala:               response.reservas[i].NUMERO_SALA,
        fechaReservaSala:         response.reservas[i].FECHA_RESERVA,
        horario:                  response.reservas[i].HORARIO
        };
        this.arrayReservaSalas.push(arraySalas);        
      }
    });
  }

  generateCalendar() {
    const daysInMonth = new Date(this.year, this.month, 0).getDate();
    const firstDayInMonth = new Date(this.year, this.month - 1, 1).getDay();
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week: Day[] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayInMonth) || day > daysInMonth) {
          week.push({ number: null, isCurrentMonth: false });
        } else {
          week.push({ number: day, isCurrentMonth: true });
          day++;
        }
      }

      this.weeks.push(week);
    }
  }


  prevMonth() {
    if (this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
    this.weeks = [];
    this.generateCalendar();
  }

  nextMonth() {
    if (this.month === 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
    this.weeks = [];
    this.generateCalendar();
    console.log(this.weeks);
  }

}
