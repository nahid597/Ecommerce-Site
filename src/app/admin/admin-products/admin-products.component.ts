import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filterProducts: any[];
  subsCription: Subscription;

  constructor( private productService: ProductService ) {
    this.subsCription = this.productService.getAll()
    .subscribe(products => this.filterProducts = this.products = products);

  }

  displayedColumns: string[] = ['title', 'price'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  filter(query: string) {
      this.filterProducts = (query) ?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  delete(key) {
    if (confirm('Are you sure you want to delete this product?')) {
       this.productService.delete(key);
    }
  }

  ngOnDestroy() {
    this.subsCription.unsubscribe();
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
