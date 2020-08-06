import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemModel } from '@app/@shared/model/Item';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemsService } from '@app/@shared/services/items.service';
import { CartService } from '@app/@shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchString = ''
  displayedColumns: string[] = ['id', 'name', 'addToCart'];
  dataSource: MatTableDataSource<ItemModel>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public itemsService: ItemsService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.initializeDataGrid()
  }

  initializeDataGrid()
  {
    this.dataSource = new MatTableDataSource<ItemModel>(this.itemsService.getAllItems());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addToCart(item: ItemModel)
  {
    this.cartService.addItem(item)
  }

  search()
  {
    if(this.searchString=='')
    {
      this.initializeDataGrid()
    }
    else
    {
      let searchedItems = this.itemsService.getAllItems().filter(item=> item.name.toLowerCase().indexOf(this.searchString.toLowerCase())!=-1)

      this.dataSource.data = searchedItems
    }
  }

}
