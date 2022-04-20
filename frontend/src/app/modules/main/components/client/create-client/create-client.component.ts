import { Component, OnInit } from '@angular/core';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { ClientService } from '../client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateCpf } from '../validators/cpf.validator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  public async createClient(client: CreateClientDto) {
    try {
      const newClient = await this.clientService.createClient(client);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Cliente criado com sucesso!',
      });
      this.backToClients();
      return newClient;
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
  
  backToClients(){
    this.router.navigateByUrl("clients");
    
  }

  submit(): void {
    this.clientForm.markAllAsTouched();
    if (this.clientForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Deu Erro',
      });
      return;
    }
    const client = this.clientForm.getRawValue() as CreateClientDto;
    this.createClient(client);
  }

  clearForm(): void {
    this.clientForm.reset();
  }

  private createForm(): void {
    this.clientForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      cpf: ['', Validators.compose([Validators.required, ValidateCpf])],
      mail: ['', Validators.compose([Validators.email])],
      phone: ['', Validators.compose([Validators.min(13)])],
    });
  }
}
