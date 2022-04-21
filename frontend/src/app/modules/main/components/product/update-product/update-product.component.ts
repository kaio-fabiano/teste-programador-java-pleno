import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { UpdateProductDto } from '../dto/update-products.dto';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  product!: Product;
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.productId = parametros['id'];
      }
    });

    this.getProductById(this.productId).then(() => {
      this.setValueForm(this.product);
    });
  }

  public async getProductById(id: number) {
    try {
      const products = await this.productService.listProducts();
      let index = products.findIndex((search) => search.id == id);
      this.product = products[index];
      console.log(this.product);
    } catch (error) {
      const data = error as AxiosError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.response?.data,
      });
    }
  }

  public async updateProduct(product: UpdateProductDto, id: number) {
    try {
      const newProduct = await this.productService.updateProduct(id, product);
      Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: 'Produto atualizado com sucesso!',
      });
      this.backToProducts();
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
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Deu Erro',
      });
      return;
    }
    const product = this.productForm.getRawValue() as UpdateProductDto;
    this.updateProduct(product, this.productId);
  }

  clearForm(): void {
    this.productForm.reset();
  }

  backToProducts() {
    this.router.navigateByUrl('products');
  }

  private initForm(): void {
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
      unities: [
        '',
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
    });
  }

  public setValueForm(product: Product): void {
    this.productForm = this.fb.group({
      description: [
        product.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      price: [
        product.price,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      unities: [
        product.unities,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
    });
  }
}
