import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Product } from '../product/models/product.model';
import { ProductService } from '../product/product.service';
import { DemandProductsService } from './demand-products.service';
import { DemandProductDto } from './dto/demandProduct.dto';

@Component({
  selector: 'app-demand-products',
  templateUrl: './demand-products.component.html',
  styleUrls: ['./demand-products.component.scss'],
})
export class DemandProductsComponent implements OnInit {
  demandProduct!: DemandProductDto;
  demandProducts!: Product[];
  products!: Product[];
  private demand_id!: number;
  products_ids: number[] = [];

  page: number = 1;
  limit: number = 10;
  init: boolean = true;
  max: boolean = false;

  constructor(
    private demandProductsService: DemandProductsService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.demand_id = parametros['id'];
        this.pagenate(0).then(() => {
          this.getProductsIds();
          this.getProducts().then(() => {
            this.filterList();
          });
        });
      }
    });
  }

  public async getProducts() {
    this.products = await this.productService.listProducts();
  }

  private getProductsIds() {
    if (this.demandProducts) {
      for (const product of this.demandProducts) {
        this.products_ids.push(product.id!);
      }
    }
  }

  private async filterList() {
    if (this.products_ids) {
      for (let id of this.products_ids) {
        const index = this.products.findIndex((product) => product.id == id);
        this.products.splice(index, 1);
      }
    }
  }

  public addToDemand(newProduct: Product) {
    if (this.products) {
      const index = this.products.findIndex(
        (product) => product.id == newProduct.id
      );

      if (index != -1) {
        this.products.splice(index, 1);
        this.demandProducts.push(newProduct);
        this.products_ids.push(newProduct.id!);
      }
    }
  }

  public removeOfDemand(newProduct: Product) {
    if (this.demandProducts) {
      const index = this.demandProducts.findIndex(
        (product) => product.id == newProduct.id
      );      
      if (index != -1) {
        this.demandProducts.splice(index, 1);
        this.products.push(newProduct);
        this.products_ids.splice(
          this.products_ids.findIndex((id) => id == newProduct.id),1
        );
      }
    }
  }

  public async commit() {
    this.demandProduct = new DemandProductDto(this.products_ids);
    try {
      const demand = await this.demandProductsService.createDemandProducts(
        this.demand_id,
        this.demandProduct
      );
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Demanda criada com sucesso!',
      });
      this.router.navigateByUrl('demands/');
      return demand;
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
      return null;
    }
  }

  public backToClients() {
    this.router.navigateByUrl('/clients');
  }

  public async pagenate(direction: number) {
    this.page += direction;
    const isProduct = await this.demandProductsService
      .listDemandProducts(this.demand_id, this.page + 1, this.limit)
      .then((isProduct) => {
        isProduct.length == 0 ? (this.max = true) : (this.max = false);
      });
    if (this.page == 1) {
      this.init = true;
    } else {
      this.init = false;
    }
    this.demandProducts = await this.demandProductsService.listDemandProducts(
      this.demand_id,
      this.page,
      this.limit
    );
  }
}
