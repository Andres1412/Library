import { Component } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { InsertReserva } from 'src/app/interfaces/reservas-interface';


@Component({
  selector: 'app-booking-books',
  templateUrl: './booking-books.component.html',
  styleUrls: ['./booking-books.component.css']
})
export class BookingBooksComponent {
  currentYear: number = 0;

  constructor(private reservasService: LibrosService){}

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  numberMonths: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years: number[] = Array.from({ length: 2 }, (_, i) => i + 2023);

  public dia1: string = "";
  public mes1: string = "";
  public anyo1: string = "";

  public dia2: string = "";
  public mes2: string = "";
  public anyo2: string = "";

  public arrayLibros : {id:number, nombre: string, stock:number}[] = [
    
  ];
  public arrayReservados : {id:number, nombre: string, stock:number}[] = [
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

  estiloLibro = {
    'visibility': 'hidden'
  }
  estiloLibro2 = {
    'visibility': 'hidden'
  }
  estiloBoton = {
    'background-color' : 'grey'
  }

  public cambiarEstilos(){
    this.estiloLibro = {
      'visibility' : 'visible'
    }
  }
  public cambiarEstilos2(){
    this.estiloLibro2 = {
      'visibility' : 'visible'
    }
  }

  public clickLibro(libro : any){
    const libroElegido = this.arrayReservados.findIndex(m => m.id === libro.id);
    if(libro.stock !== 0){
      if(libroElegido === -1){
        this.arrayReservados.push({ id: libro.id, nombre: libro.nombre, stock: 1});
      }else{
        this.arrayReservados[libroElegido].stock++;
      }
      libro.stock--;
    } else {
      alert('No hay más stock');
    }

  }

  public restar(libroReservado: any){
    const libroElegido = this.arrayLibros.findIndex(m => m.id === libroReservado.id);
    if(libroReservado.stock !== 1){
      if(libroElegido === -1){
        this.arrayLibros.push({ id: libroReservado.id, nombre: libroReservado.nombre, stock: 1});
      }
      libroReservado.stock--;
    } else {
      const indice = this.arrayReservados.findIndex(mat => mat.id === libroReservado.id);
      this.arrayReservados.splice(indice, 1);
    }
    this.arrayLibros[libroElegido].stock++;
  }

  public borrar(libroReservado: any){
    for(let i = 0; i < this.arrayLibros.length ; i++){
      if(libroReservado.id === this.arrayLibros[i].id){
        this.arrayLibros[i].stock += libroReservado.stock;
        const indice = this.arrayReservados.findIndex(mat => mat.id === libroReservado.id);
        if(indice !== -1) {
          this.arrayReservados.splice(indice, 1);
        }
      }
    }
  }

  public onDate(){
    let fechaReserva = this.anyo1+'-'+this.mes1+'-'+this.dia1;
    let fechaDevolucion = this.anyo2+'-'+this.mes2+'-'+this.dia2;

    let data = localStorage.getItem('user');
    let userId = (data) ? JSON.parse(data).ID : '';

    let reservasFormateadas : InsertReserva[] =[];
    for(let i = 0 ; i < this.arrayReservados.length ; i++){
      let array : InsertReserva = {
          USUARIO_ID:        userId,
          LIBRO_ID:          this.arrayReservados[i].id,
          CANTIDAD:          this.arrayReservados[i].stock,
          FECHA_RESERVA:     fechaReserva,
          FECHA_DEVOLUCION:  fechaDevolucion,
      };
      
      this.reservasService.insertReserva(JSON.stringify(array)).subscribe((response)=>{
      });
    }
    }

    ngOnInit(){
      this.reservasService.getLibrosList().subscribe((response)=>{

        console.log(response.libros);
        

        for (let i = 0; i < response.libros.length; i++) {
          let array : {id:number, nombre: string, stock:number} = {
          id:         response.libros[i].ID,
          nombre:     response.libros[i].NOMBRE,
          stock:      response.libros[i].STOCK
          };
          this.arrayLibros.push(array);
        }
      });
    }
}
