import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from './models/client.model';
import axios from 'axios';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private path: string = '/clients/';
  private apiUrl: string = environment.urlToApi;

  public async listClients() {
    const { data } = await axios.get<Client[]>(this.apiUrl + this.path);
    return data;
  }

  public async listPageClients(page: number, limit: number) {
    const { data } = await axios.get<Client[]>(
      this.apiUrl + this.path + '?page=' + (page-1) + '&limit=' + limit
    );
    return data;
  }

  public async createClient(client: CreateClientDto) {
    const { data } = await axios.post<Client>(this.apiUrl + this.path, client);
    return data;
  }

  public async updateClient(id: number, client: UpdateClientDto) {
    const { data } = await axios.put<Client>(
      this.apiUrl + this.path + id,
      client
    );
    return data;
  }

  public async deleteClient(id: number) {
    const { data } = await axios.delete(this.apiUrl + this.path + id);
    return data;
  }
}
