import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { ClientService } from '../client.service';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../models/client.model';
import { ValidateCpf } from '../validators/cpf.validator';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnInit {
  client!: Client;
  clientForm!: FormGroup;
  clientId!: number;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.clientId = parametros['id'];
      }
    });

    this.getClientById(this.clientId).then(() => {
      this.setValueForm(this.client);
    });
  }

  public async getClientById(id: number) {
    try {
      const clients = await this.clientService.listClients();
      let index = clients.findIndex((search) => search.id == id);
      this.client = clients[index];
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
    }
  }

  public async updateClient(client: UpdateClientDto, id: number) {
    try {
      const newClient = await this.clientService.updateClient(id, client);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Cliente atualizado com sucesso!',
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
    const client = this.clientForm.getRawValue() as UpdateClientDto;
    this.updateClient(client, this.clientId);
  }

  clearForm(): void {
    this.clientForm.reset();
  }

  private initForm(): void {
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
      phone: ['', Validators.compose([Validators.minLength(15)])],
    });
  }

  public setValueForm(client: Client): void {
    this.clientForm = this.fb.group({
      name: [
        client.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      cpf: [client.cpf, Validators.compose([Validators.required, ValidateCpf])],
      mail: [client.mail, Validators.compose([Validators.email])],
      phone: [client.phone, Validators.compose([Validators.minLength(15)])],
    });
  }
}
