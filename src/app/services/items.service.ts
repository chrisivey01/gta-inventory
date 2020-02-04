import { Items } from './../response/Items';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import json from '../assets/data.json';

// import { Users } from "../model/Users";
// import { Store } from '@ngrx/store'
// import { AppState } from '../store/reducers'
// import { getUsers } from '../store/actions'

@Injectable()
export class ItemsService {
    // json: any = json
    data = '../assets/data.json'
  constructor(private http: HttpClient) {}
  getItems(): Observable<Items>{
      return this.http.get<Items>(this.data);
    // return this.http.get<Users>('http://localhost:8080/get-users')
  }

  
}