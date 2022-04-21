import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private path: string = '/products/';
  private apiUrl: string = environment.urlToApi;

  public async listProducts() {
    const { data } = await axios.get<Product[]>(this.apiUrl + this.path);
    return data;
  }

  public async listPageProducts(page: number, limit: number) {
    const { data } = await axios.get<Product[]>(
      this.apiUrl + this.path + '?page=' + (page - 1) + '&limit=' + limit
    );
    return data;
  }

  public async createProduct(product: CreateProductDto) {
    const { data } = await axios.post<Product>(
      this.apiUrl + this.path,
      product
    );
    return data;
  }

  public async updateProduct(id: number, product: UpdateProductDto) {
    const { data } = await axios.put<Product>(
      this.apiUrl + this.path + id,
      product
    );
    return data;
  }

  public async deleteProduct(id: number) {
    const { data } = await axios.delete(this.apiUrl + this.path + id);
    return data;
  }
}
