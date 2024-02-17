import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customincrement } from '../../shared/store/counter.actions';
import { CounterModel } from '../../shared/store/counter.model';
import { Subscription } from 'rxjs';
import { getchannelname } from '../../shared/store/counter.selector';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrl: './customcounter.component.css'
})
export class CustomcounterComponent {
  counterinput: number = 0;
  actiontype: string = "add";
  channelname: string = "";
  counterSubscribe$!: Subscription;

  constructor(private store: Store<{ counter: CounterModel }>) {

  }

  ngOnInit() {
    this.counterSubscribe$ = this.store.select(getchannelname).subscribe(data => {
      console.log('Custom Counter', data);
      this.channelname = data;
    });
  }

  onIncrement() {
    this.store.dispatch(customincrement({ value: +this.counterinput, action: this.actiontype }));
  }

}
