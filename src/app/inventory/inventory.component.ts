import { Items } from './../response/Items';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemsService } from '../services/items.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})

export class InventoryComponent implements OnInit {

  usersInventory: any[] = new Array(25);
  otherInventory: any[] = new Array(25);
  // item: {};
  fileName: string;
  receivedUsersItems$: Observable<Items>;


  // one dimensional input model
  // items: Array<number> = Array.from({ length: 21 }, (v, k) => k + 1);
  // two dimensional table matrix representing view model
  itemsTable: any[];

  // fix column width as defined in CSS (150px + 5px margin)
  boxWidth = 155;
  // calculated based on dynamic row width
  columnSize: number;


  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    let gatherItems = [];
    this.receivedUsersItems$ = this.itemsService.getItems();
    this.receivedUsersItems$.subscribe(info => {
      gatherItems.push(info)
      console.log(info)
    })
    this.usersInventory = [...gatherItems, ...this.usersInventory].splice(0, 25)
  }


  getItemsTable(rowLayout: Element): number[][] {
    // calculate column size per row
    const { width } = rowLayout.getBoundingClientRect();
    const columnSize = Math.round(width / this.boxWidth);
    // view has been resized? => update table with new column size
    if (columnSize != this.columnSize) {
      this.columnSize = columnSize;
      this.initTable();
    }
    return this.itemsTable;
  }

  initTable() {
    // create table rows based on input list
    // example: [1,2,3,4,5,6] => [ [1,2,3], [4,5,6] ]
    this.itemsTable = this.usersInventory
      .filter((_, outerIndex) => outerIndex % this.columnSize == 0) // create outter list of rows
      .map((
        _,
        rowIndex // fill each row from...
      ) =>
        this.usersInventory.slice(
          rowIndex * this.columnSize, // ... row start and
          rowIndex * this.columnSize + this.columnSize // ...row end
        )
      );
  }

  reorderDroppedItem(event: CdkDragDrop<number[]>) {
    // same row/container? => move item in same row
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // different rows? => transfer item from one to another list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // update items after drop: flatten matrix into list
    // example: [ [1,2,3], [4,5,6] ] => [1,2,3,4,5,6]
    this.usersInventory = this.itemsTable.reduce(
      (previous, current) => previous.concat(current),
      []
    );

    // re-initialize table - makes sure each row has same numbers of entries
    // example: [ [1,2], [3,4,5,6] ] => [ [1,2,3], [4,5,6] ]
    this.initTable();
  }
}



