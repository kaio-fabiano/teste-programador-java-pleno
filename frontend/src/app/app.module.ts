import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './modules/main/main.component';
import { ClientComponent } from './modules/main/components/client/client.component';
import { ProductComponent } from './modules/main/components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CreateClientComponent } from './modules/main/components/client/create-client/create-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateClientComponent } from './modules/main/components/client/update-client/update-client.component';
import { CreateProductComponent } from './modules/main/components/product/create-product/create-product.component';
import { DemandComponent } from './modules/main/components/demand/demand.component';
import { CreateDemandComponent } from './modules/main/components/demand/create-demand/create-demand.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UpdateProductComponent } from './modules/main/components/product/update-product/update-product.component';
import { UpdateDemandComponent } from './modules/main/components/demand/update-demand/update-demand.component';
import { ClientDemandsComponent } from './modules/main/components/client/client-demands/client-demands.component';
import { DemandProductsComponent } from './modules/main/components/demand-products/demand-products.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ClientComponent,
    ProductComponent,
    CreateClientComponent,
    UpdateClientComponent,
    CreateProductComponent,
    DemandComponent,
    CreateDemandComponent,
    UpdateProductComponent,
    UpdateDemandComponent,
    ClientDemandsComponent,
    DemandProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
