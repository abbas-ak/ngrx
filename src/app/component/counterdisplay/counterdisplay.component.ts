import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterModel } from '../../shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';
import { getcounter } from '../../shared/store/counter.selector';
import { AppStateModel } from '../../shared/store/global/app-state.model';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent {

  counterDisplay: number = 0;
  counterSubscribe$!: Subscription;
  counter$ !: Observable<CounterModel>;

  constructor(private store: Store<AppStateModel>) {

  }

  ngOnInit(): void {
    this.counterSubscribe$ = this.store.select(getcounter).subscribe(data => {
      this.counterDisplay = data;
      console.log('Counter Display', data);
    });

    this.counter$ = this.store.select('counter');
  }

  ngOnDestroy() {
    if(this.counterSubscribe$) this.counterSubscribe$.unsubscribe();
  }

}
