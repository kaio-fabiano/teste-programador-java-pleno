import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public async createPoduct(product: CreateProductDto) {
    try {
      const newProduct = await this.productService.createProduct(product);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Product criado com sucesso!',
      });
      this.backToProducts();
      return newProduct;
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

  backToProducts() {
    this.router.navigateByUrl('products');
  }

  submit(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Deu Erro',
      });
      return;
    }
    const product = this.productForm.getRawValue() as CreateProductDto;
    this.createPoduct(product);
  }

  clearForm(): void {
    this.productForm.reset();
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      price: ['', Validators.compose([Validators.required, Validators.min(1)])],
      unities: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });
  }
}
