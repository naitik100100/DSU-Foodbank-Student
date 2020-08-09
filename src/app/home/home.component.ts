import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemModel } from '@app/@shared/model/Item';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemsService } from '@app/@shared/services/items.service';
import { CartService } from '@app/@shared/services/cart.service';
import { AuthenticationService } from '@app/@shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchString = ''
  displayedColumns: string[] = ['id', 'itemname','quantity', 'addToCart'];
  dataSource: MatTableDataSource<ItemModel>;
  items:ItemModel[] = []


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public itemsService: ItemsService,
    public cartService: CartService,
    public authService: AuthenticationService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.initializeDataGrid()
  }

  initializeDataGrid()
  {
    this.itemsService.getAllItems().subscribe((data:any)=>
    {
      this.items = data.Items
      this.dataSource = new MatTableDataSource<ItemModel>(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
      let searchedItems = this.items.filter(item=> item.itemname.toLowerCase().indexOf(this.searchString.toLowerCase())!=-1)

      this.dataSource.data = searchedItems
    }
  }

}
