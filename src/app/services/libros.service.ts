import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservas } from '../interfaces/reservas-interface';
import { Libro, Libros } from '../interfaces/libros-interface';
import { UserList } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(public http: HttpClient) { }
  public prevUrl : string = 'http://localhost:8000/api/';
  public reservaUrl : string = this.prevUrl+'reservaLibro';
  public libroUrl : string = this.prevUrl+'libros';
  public deleteLibroUrl : string = this.prevUrl+'/reservaLibro/';

  public getLibrosList() : Observable<Libros>
  {
    return this.http.get<Libros>(this.libroUrl);
  }

  public getBookingLibro() : Observable<Reservas>
  {
    return this.http.get<Reservas>(this.reservaUrl);
  }

  public insertReserva(body: string){
    return this.http.post(this.reservaUrl, body);
  }

  public getLibros() : Observable<Libros>
  {
    return this.http.get<Libros>(this.libroUrl);
  }

  public deleteBooking(idUser : number, idLibro : number, bookingDate : string)
  {
    this.http.delete(this.deleteLibroUrl+'/'+idUser+'/'+idLibro+'/'+bookingDate);
  }
}
