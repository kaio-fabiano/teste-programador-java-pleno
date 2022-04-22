import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { DemandService } from '../../demand/demand.service';
import { Demand } from '../../demand/model/demand.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-demands',
  templateUrl: './client-demands.component.html',
  styles: [],
})
export class ClientDemandsComponent implements OnInit {
  public demands: Array<Demand> = [];
  private client_id?: number;
  public pag: number = 1;
  init: boolean = true;
  max: boolean = false;
  public contador: number = 5;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private demandService: DemandService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.client_id = parametros['id'];
        this.pagenate(0);
      }
    });
  }

  public async createDemand() {
    this.router.navigateByUrl('demands/create');
  }

  public async updateDemand(id: number) {
    this.router.navigateByUrl('demands/update/' + id);
  }

  public addItens(id: number) {
    this.router.navigateByUrl('demands/products/' + id);
  }

  public async deleteDemand(id: number) {
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
          const newDemand = await this.demandService.deleteDemand(id);
          this.demands?.splice(
            this.demands.findIndex((demand) => demand.id === id),
            1
          );
          Swal.fire('Deletado!', 'O pedido foi deletado', 'success');
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

  public async goToClients() {
    this.router.navigateByUrl('clients');
  }

  public async pagenate(direction: number) {
    this.pag += direction;
    const isDemand = await this.clientService
      .listClientDemands(this.client_id!, this.pag + 1, 10)
      .then((isDemand) => {
        isDemand.length == 0 ? (this.max = true) : (this.max = false);
      });

    if (this.pag == 1) {
      this.init = true;
    } else {
      this.init = false;
    }
    this.demands = await this.clientService.listClientDemands(
      this.client_id!,
      this.pag,
      10
    );
  }
}
