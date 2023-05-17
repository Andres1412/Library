import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salas } from '../interfaces/salas';
import { Observable } from 'rxjs';
import { ReservasSalas } from '../interfaces/reservas-salas-interface';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(public http: HttpClient) { }
  public prevUrl : string = 'http://localhost:8000/';
  public reservaUrl : string = this.prevUrl+'reservaSala';
  public salaUrl : string = this.prevUrl+'salas';
  public deleteSalaUrl : string = this.prevUrl+'/reservaSala/';

  public getSalasList() : Observable<any>
  {
    return this.http.get<any>(this.salaUrl);
  }

  public getBookingSala() : Observable<any>
  {
    return this.http.get<ReservasSalas>(this.reservaUrl);
  }

  public insertReserva(body: string){
    return this.http.post(this.reservaUrl, body);
  }

  public getSalas() : Observable<any>
  {
    return this.http.get<any>(this.salaUrl);
  }

  public deleteBookingSala(idUser : number, idSala : number, bookingDate : string)
  {
    this.http.delete(this.deleteSalaUrl+'/'+idUser+'/'+idSala+'/'+bookingDate);
  }
}
