import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    ) {

    this.categories$ = categoryService.getCategories();

    this.id = route.snapshot.paramMap.get('id');

    if (this.id) {
       this.productService.get(this.id);
    }

   }

   save(product) {
     if (this.id) {
     this.productService.update(this.id, product);
     } else {
       this.productService.create(product);
      }

      this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }

}
