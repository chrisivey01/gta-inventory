import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  usersInventory: any[] = new Array(25);
  otherInventory: any[] = new Array(25);
  item: {};
  fileName:string;
  receivedItems: any[]
  constructor() { }

  ngOnInit() {
    this.receivedItems = [ 
        {
          name: "beer",
          count:5,
          total:5
        },
        {
          name: "powerade",
          count:5,
          total:5
        },
      ]
      this.usersInventory = [...this.receivedItems, ...this.usersInventory].splice(0,25)
    }
  }

