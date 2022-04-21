import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { DemandService } from './demand.service';
import { Demand } from './model/demand.model';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
})
export class DemandComponent implements OnInit {
  public demands: Array<Demand> = [];
  private client_id?: number;
  public pag: number = 1;
  init: boolean = true;
  max: boolean = false;
  public contador: number = 5;

  constructor(
    private demandService: DemandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.client_id = parametros['id'];
        this.listClientDemands();
      } else {
        this.pagenate(0);
      }
    });
  }

  public async listDemands() {
    const demands = await this.demandService.listDemands();
    return demands;
  }

  public async listClientDemands() {
    this.listDemands().then((demand) => {
      demand.forEach((demand) => {
        if (demand.client_id == this.client_id) {
          this.demands!.push(demand);
        }
      });
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
          const newClient = await this.demandService.deleteDemand(id);
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

  public async goToProducts() {
    this.router.navigateByUrl('clients');
  }

  public async pagenate(direction: number) {
    this.pag += direction;
    const isDemand = await this.demandService
      .listPageDemands(this.pag + 1, 10)
      .then((isDemand) => {
        isDemand.length == 0 ? (this.max = true) : (this.max = false);
      });
    if (this.pag == 1) {
      this.init = true;
    } else {
      this.init = false;
    }
    this.demands = await this.demandService.listPageDemands(this.pag, 10);
  }
}
