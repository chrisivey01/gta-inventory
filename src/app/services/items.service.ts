import { Items } from './../response/Items';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ItemsService {
  // url = 'assets/data.json'
  data = [
        {
            "name": "beer",
            "count": 5,
            "total": 5
        },
        {
            "name": "powerade",
            "count": 5,
            "total": 5
        }
    ]
    
  constructor(private http: HttpClient) {}
  getItems(){
      return this.data;
  }
}

// data = [
//   {
//       "name": "beer",
//       "count": 5,
//       "total": 5
//   },
//   {
//       "name": "powerade",
//       "count": 5,
//       "total": 5
//   }
// ]

// constructor(private http: HttpClient) {}
// getItems(): <Items>{
// return this.data;
// }
// }