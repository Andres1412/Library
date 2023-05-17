import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent {
  constructor(private router: Router) {}
  @Output() reset = new EventEmitter<boolean>()
  public currentRoute : string = '';
  public userName = 'Andres';

  public sendReset() : void
  {
    this.reset.emit();
  }
  ngOnInit(){
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url.slice(1);
      });

  }
}


