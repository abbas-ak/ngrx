import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent {

  counterDisplay: number = 0;

  constructor(private store: Store<{counter: {counter: number}}>) {

  }

  ngOnInit(): void {
    console.log("On ");
    this.store.select('counter').subscribe(data => {
      console.log("On Increment", data);
      this.counterDisplay = data.counter;
    });
  }

}
