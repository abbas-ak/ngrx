import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterModel } from '../../shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent {

  counterDisplay: number = 0;
  channelname: string = "";
  // counterSubscribe$!: Subscription;
  counter$ !: Observable<CounterModel>;

  constructor(private store: Store<{counter: CounterModel}>) {

  }

  ngOnInit(): void {
    console.log("On ");
    /* this.counterSubscribe$ = this.store.select('counter').subscribe(data => {
      console.log("On Increment", data);
      this.counterDisplay = data.counter;
      this.channelname = data.channelname;
    }); */

    this.counter$ = this.store.select('counter');
  }

  ngOnDestroy() {
    // if(this.counterSubscribe$) this.counterSubscribe$.unsubscribe();
  }

}
