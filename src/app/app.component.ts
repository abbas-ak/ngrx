import { Component } from '@angular/core';
import { MasterService } from './shared/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx2';

  constructor(private service: MasterService){

  }

  ngOnInit() {
    /* this.service.getAll().subscribe(data => {
      console.log("GetAll::", data);
    }); */
  }
}
