import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { DemandService } from '../demand.service';
import { CreateDemandDto } from '../dto/create-demand.dto';

@Component({
  selector: 'app-create-demand',
  templateUrl: './create-demand.component.html',
  styleUrls: ['./create-demand.component.scss']
})
export class CreateDemandComponent implements OnInit {
  demandForm!: FormGroup;
  private client_id!: number;
  
  constructor(
    private demandService: DemandService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.client_id = parametros['id'];
      }
    });
  }
  
  public async createProduct(demand: CreateDemandDto) {
    try {
      demand.client_id = this.client_id;
      const newDemand = await this.demandService.createDemand(demand);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Pedido criado com sucesso!',
      });
      this.router.navigateByUrl("demands/products/"+newDemand.id);
      return newDemand;
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

  submit(): void {
    this.demandForm.markAllAsTouched();
    if (this.demandForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Deu Erro",
      });
      return;
    }
    const product = this.demandForm.getRawValue() as CreateDemandDto;
    this.createProduct(product);
  }

  clearForm(): void {
    this.demandForm.reset();
  }

  private createForm(): void {
    this.demandForm = this.fb.group({
      description: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
    });
  }
}
