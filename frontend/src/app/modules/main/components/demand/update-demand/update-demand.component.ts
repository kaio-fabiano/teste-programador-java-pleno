import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { DemandService } from '../demand.service';
import { UpdateDemandDto } from '../dto/update-demand.dto';
import { Demand } from '../model/demand.model';

@Component({
  selector: 'app-update-demand',
  templateUrl: './update-demand.component.html',
  styleUrls: ['./update-demand.component.scss'],
})
export class UpdateDemandComponent implements OnInit {
  demand!: Demand;
  demandForm!: FormGroup;
  demandId!: number;

  constructor(
    private demandService: DemandService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.demandId = parametros['id'];
      }
    });

    this.getDemandById(this.demandId).then(() => {
      this.setValueForm(this.demand);
    });
  }

  public async getDemandById(id: number) {
    try {
      const demands = await this.demandService.listDemands();
      let index = demands.findIndex((search) => search.id == id);
      this.demand = demands[index];
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
    }
  }

  public async updateDemand(demand: UpdateDemandDto, id: number) {
    try {
      const newDemand = await this.demandService.updateDemand(id, demand);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Demanda atualizada com sucesso!',
      });
      this.backToDemands();
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
    }
  }

  submit(): void {
    this.demandForm.markAllAsTouched();
    if (this.demandForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo deu errado ;-;',
      });
      return;
    }
    const demand = this.demandForm.getRawValue() as UpdateDemandDto;
    demand.client_id = this.demand.client_id;
    this.updateDemand(demand, this.demandId);
  }

  clearForm(): void {
    this.demandForm.reset();
  }

  backToDemands() {
    this.router.navigateByUrl('demands');
  }

  private initForm(): void {
    this.demandForm = this.fb.group({
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  public setValueForm(demand: Demand): void {
    this.demandForm = this.fb.group({
      description: [
        demand.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      price: [
        demand.description,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
    });
  }
}
