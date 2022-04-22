import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './models/client.model';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clients?: Array<Client>;
  page: number = 1;
  contador: number = 5;
  init: boolean = true;
  max: boolean = false;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.pagenate(0);
  }

  public async createClient() {
    this.router.navigateByUrl('clients/create');
  }

  public async updateClient(id: number) {
    this.router.navigateByUrl('clients/update/' + id);
  }

  public async deleteClient(id: number) {
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
          const newClient = await this.clientService.deleteClient(id);
          this.clients?.splice(
            this.clients.findIndex((client) => client.id === id),
            1
          );
          Swal.fire('Deletado!', 'O cliente foi deletado', 'success');
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

  public goToProducts() {
    this.router.navigateByUrl('products');
  }

  public goToDemands() {
    this.router.navigateByUrl('demands');
  }

  public clientDemands(id: number) {
    this.router.navigateByUrl('clients/demands/' + id);
  }

  public createDemand(client_id: number) {
    this.router.navigateByUrl('demands/create/' + client_id);
  }

  public async pagenate(direction: number) {
    this.page += direction;
    const isClient = await this.clientService
      .listPageClients(this.page + 1, 10)
      .then((isClient) => {
        isClient.length == 0 ? (this.max = true) : (this.max = false);
      });
    if (this.page == 1) {
      this.init = true;
    } else {
      this.init = false;
    }
    this.clients = await this.clientService.listPageClients(this.page, 10);
  }
}
