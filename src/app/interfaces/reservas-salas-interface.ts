export interface ReservasSalasInterface {
  reservas : ReservasSalas[];
}

export interface ReservasSalas {
    USUARIO_NOMBRE:     string;
    NUMERO_SALA:        number;
    HORARIO:            string;
    FECHA_RESERVA:      string;
  }

  export interface InsertReservaSala {
    USUARIO_ID:         number;
    NUMERO_SALA:        number;
    HORARIO:            string;
    FECHA_RESERVA:      string;
  }