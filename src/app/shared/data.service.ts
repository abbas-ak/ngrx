import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(): {} | Observable<{}> | Promise<{}> {
    return {
      products: [
        {
          id: 1,
          name: 'Seaman Cap',
          description: 'Lorem ipsum',
          price: 40
        },
        {
          id: 1,
          name: 'T-Shirt',
          description: 'Lorem ipsum',
          price: 80
        },
      ]
    };
  }
}
