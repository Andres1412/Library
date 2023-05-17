import { Component } from '@angular/core';
import { InsertReservaSala, ReservasSalas } from 'src/app/interfaces/reservas-salas-interface';
import { Sala, Salas } from 'src/app/interfaces/salas';
import { SalasService } from 'src/app/services/salas.service';

@Component({
  selector: 'app-booking-rooms',
  templateUrl: './booking-rooms.component.html',
  styleUrls: ['./booking-rooms.component.css']
})
export class BookingRoomsComponent {
  currentYear: number = 0;

  constructor(private reservasService: SalasService){}

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  numberMonths: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years: number[] = Array.from({ length: 2 }, (_, i) => i + 2023);
  hours: number[] = Array.from({ length: 15 }, (_, i) => i + 8);
  minutes: string[] = ["00", "15", "30", "45" ];

  public dia1: string = "";
  public mes1: string = "";
  public anyo1: string = "";

  public hour: string = "";
  public minutos: string = "";

  public arraySalas : {numSala:number, stock:number}[] = [
    
  ];
  public arrayReservados : {numSala:number, stock: number}[] = [
  ];

  modalStyle = {
    'display': 'none',
    'background-color' : ''
  }

  mostrarModal(){
    this.modalStyle = {
      'display' : 'flex',
      'background-color' : 'rgba(0, 0, 0, 0.7)'
    }
  }
  cerrarModal(){
    this.modalStyle = {
    'display': 'none',
    'background-color' : ''
    }
  }

  estiloSalas = {
    'visibility': 'hidden'
  }
  estiloSalas2 = {
    'visibility': 'hidden'
  }
  estiloBoton = {
    'background-color' : 'grey'
  }

  public cambiarEstilos(){
    this.estiloSalas = {
      'visibility' : 'visible'
    }
  }
  public cambiarEstilos2(){
    this.estiloSalas2 = {
      'visibility' : 'visible'
    }
  }

  public clickSala(sala : any){
    const salaElegido = this.arrayReservados.findIndex(m => m.numSala === sala.id);
    if(sala.stock !== 0){
      if(salaElegido === -1){
        this.arrayReservados.push({ numSala: sala.numSala, stock: 1});
      }else{
        this.arrayReservados[salaElegido].stock++;
      }
      sala.stock--;
    } else {
      alert('No hay más stock');
    }
  }

  public restar(salaReservado: any){
    const salaElegido = this.arraySalas.findIndex(m => m.numSala === salaReservado.numSala);
    
    if(salaReservado.stock !== 1){
      
      if(salaElegido === -1){
        this.arraySalas.push({ numSala: salaReservado.numSala, stock: 1});
      }
      console.log(salaReservado.stock);
      
      salaReservado.stock--;
    } else {
      const indice = this.arrayReservados.findIndex(mat => mat.numSala === salaReservado.numSala);
      this.arrayReservados.splice(indice, 1);
    }
    this.arraySalas[salaElegido].stock++;
  }

  public borrar(salaReservado: any){
    for(let i = 0; i < this.arraySalas.length ; i++){
      if(salaReservado.numSala === this.arraySalas[i].numSala){
        this.arraySalas[i].stock += salaReservado.stock;
        const indice = this.arrayReservados.findIndex(mat => mat.numSala === salaReservado.numSala);
        if(indice !== -1) {
          this.arrayReservados.splice(indice, 1);
        }
      }
    }
  }

  public onDate(){
    let fechaReserva = this.anyo1+'-'+this.mes1+'-'+this.dia1;
    let fechaDevolucion = this.hour+':'+this.minutos;

    let data = localStorage.getItem('user');
    let userId = (data) ? JSON.parse(data).ID : '';

    let reservasFormateadas : InsertReservaSala[] =[];
    for(let i = 0 ; i < this.arrayReservados.length ; i++){
      let array : InsertReservaSala = {
          USUARIO_ID:        userId,
          NUMERO_SALA:       this.arrayReservados[i].numSala,
          HORARIO:           fechaDevolucion,
          FECHA_RESERVA:     fechaReserva,
      };
      
      this.reservasService.insertReserva(JSON.stringify(array)).subscribe((response)=>{
      });
    }
  }

  ngOnInit(){
    this.reservasService.getSalasList().subscribe((response)=>{       
      for (let i = 0; i < response[0].length; i++) {
        let array : {numSala:number, stock: number} = {
        numSala:     response[0][i].NUMERO_SALA,
        stock:       response[0][i].STOCK
        };
        this.arraySalas.push(array);
      }
    });
  }
}
