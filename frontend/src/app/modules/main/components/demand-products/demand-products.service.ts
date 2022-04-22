import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Product } from '../product/models/product.model';
import { DemandProductDto } from './dto/demandProduct.dto';

@Injectable({
  providedIn: 'root',
})
export class DemandProductsService {
  private pathProducts: string = '/products';
  private pathDemands: string = '/demands/';
  private apiUrl: string = environment.urlToApi;

  public async listDemandProducts(id: number, page: number, limit: number) {
    const { data } = await axios.get<Product[]>(
      this.apiUrl +
        this.pathDemands +
        id +
        this.pathProducts +
        '?page=' +
        page +
        '&limit=' +
        limit
    );
    return data;
  }

  public async createDemandProducts(
    id: number,
    demandProducts: DemandProductDto
  ) {
    const { data } = await axios.post<Product[]>(
      this.apiUrl + this.pathDemands + id + this.pathProducts,
      demandProducts
    );
    return data;
  }
}
