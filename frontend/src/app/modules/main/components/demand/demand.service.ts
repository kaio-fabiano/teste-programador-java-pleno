import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { Demand } from './model/demand.model';


@Injectable({
  providedIn: 'root'
})
export class DemandService {

  private path: string = "/demands/";
  private apiUrl: string = environment.urlToApi;

  public async listDemand() {
    const { data } = await axios.get<Demand[]>(this.apiUrl + this.path);
    return data;
  }
  
  public async listPageDemands(page: number, limit: number) {
    const { data } = await axios.get<Demand[]>(
      this.apiUrl + this.path + '?page=' + (page-1) + '&limit=' + limit
    );
    return data;
  }

  public async createDemand(demand: CreateDemandDto) {
    const { data } = await axios.post<Demand>(this.apiUrl + this.path, demand);
    return data;
  }

  public async updateDemand(id: number, demand: UpdateDemandDto) {
    const { data } = await axios.put<Demand>(this.apiUrl + this.path + id, demand);
    return data;
  }

  public async deleteDemand(id: number) {
    const { data } = await axios.delete(this.apiUrl + this.path + id);
    return data;
  }
}
