import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products?: Array<Product>;
  page: number = 1;
  contador: number = 5;
  init: boolean = true;
  max: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.pagenate(0);
  }

  public async createProduct() {
    this.router.navigateByUrl('products/create');
  }

  public async updateProduct(id: number) {
    this.router.navigateByUrl('products/update/' + id);
  }

  public async deleteProduct(id: number) {
    try {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Essa operação não pode ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newproduct = await this.productService.deleteProduct(id);
          this.products?.splice(
            this.products.findIndex((product) => product.id === id),
            1
          );
          Swal.fire('Deletado!', 'O produto foi deletado', 'success');
        }
      });
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
    }
  }

  public goToClients() {
    this.router.navigateByUrl('clients');
  }

  public goToDemands() {
    this.router.navigateByUrl('demands');
  }

  public async pagenate(direction: number) {
    this.page += direction;
    const isClient = await this.productService
      .listPageProducts(this.page + 1, 10)
      .then((isClient) => {
        isClient.length == 0 ? (this.max = true) : (this.max = false);
      });
    if (this.page == 1) {
      this.init = true;
    } else {
      this.init = false;
    }
    this.products = await this.productService.listPageProducts(this.page, 10);
  }

}
