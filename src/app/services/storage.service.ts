import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserList } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public http: HttpClient) { }

  private userData : UserList = {
    ID:             0,
    NOMBRE_USUARIO: '',
    CONTRASEÑA:     '',
    CORREO:         '',
    TIPO:     '',
  }
  public setUser(user : UserList) : void
  {
    this.userData = user;
  }
  public getUser() : UserList
  {
    return this.userData;
  }
}
