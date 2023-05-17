export interface Reservas {
    reservas: Reserva[];
  }
  
  export interface Reserva {
    NOMBRE_USUARIO:   string;
    NOMBRE_LIBRO:     string;
    CANTIDAD:         number;
    FECHA_RESERVA:    string;
    FECHA_DEVOLUCION: string;
  }
  
  export interface InsertReserva {
    USUARIO_ID:       number;
    LIBRO_ID:         number;
    CANTIDAD:         number;
    FECHA_RESERVA:    string;
    FECHA_DEVOLUCION: string;
  }
  