import { Component, Output, EventEmitter } from '@angular/core';
import { UserList } from 'src/app/interfaces/users-interface';
import { UsersService } from 'src/app/services/users.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public UsersService :  UsersService, private storageService : StorageService) { }

  @Output() log = new EventEmitter<boolean>()

  public userName : string = '';
  public passWord : string = '';

  public validated : {userName:boolean, passWord:boolean} = {
    userName:false, passWord:false
  };
  public userData : UserList = {ID:0,NOMBRE_USUARIO:'', CONTRASEÑA:'', CORREO:'', TIPO:''};

  public logIn() : void
  {
    if(this.validated.passWord === true && this.validated.userName === true) {

      this.storageService.setUser(this.userData);

      localStorage.setItem('user',JSON.stringify(this.userData));
      this.log.emit();
    } else {
      alert('Algun dato se ha introducido incorrectamente, vuelvalo a intentar')
    }
  }

  public validateUser() : void
  {
    this.UsersService.getUsers().subscribe((response) => {
      let existName = response.userList.filter((user) => (user.NOMBRE_USUARIO === this.userName));
      let existPassword = response.userList.filter((user)=>(user.NOMBRE_USUARIO === this.userName && user.CONTRASEÑA === this.passWord));
      if(existName.length < 1){
        this.validated.userName = false;
        this.validated.passWord = false;
        this.passWord = '';
        this.userName = '';
      }

      if(existName.length > 0){
        this.validated.userName = true;
        this.userData = existName[0];

        if(existPassword.length > 0) {
          this.validated.passWord = true;
          this.userData = existPassword[0];

        } else {
          this.validated.passWord = false;
          this.passWord = '';
        }
        //console.log(this.validated)
        this.logIn();
      }
    });
  }
}
