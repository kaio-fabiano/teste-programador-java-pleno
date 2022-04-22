import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDemandsComponent } from './modules/main/components/client/client-demands/client-demands.component';
import { ClientComponent } from './modules/main/components/client/client.component';
import { CreateClientComponent } from './modules/main/components/client/create-client/create-client.component';
import { UpdateClientComponent } from './modules/main/components/client/update-client/update-client.component';
import { DemandProductsComponent } from './modules/main/components/demand-products/demand-products.component';
import { CreateDemandComponent } from './modules/main/components/demand/create-demand/create-demand.component';
import { DemandComponent } from './modules/main/components/demand/demand.component';
import { UpdateDemandComponent } from './modules/main/components/demand/update-demand/update-demand.component';
import { CreateProductComponent } from './modules/main/components/product/create-product/create-product.component';
import { ProductComponent } from './modules/main/components/product/product.component';
import { UpdateProductComponent } from './modules/main/components/product/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: ClientComponent,
  },
  {
    path: 'clients/create',
    component: CreateClientComponent,
  },
  {
    path: 'clients/update/:id',
    component: UpdateClientComponent,
  },
  {
    path: 'clients/demands/:id',
    component: ClientDemandsComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
  },
  {
    path: 'products/update/:id',
    component: UpdateProductComponent,
  },
  {
    path: 'demands',
    component: DemandComponent,
  },
  {
    path: 'demands/:id',
    component: DemandComponent,
  },
  {
    path: 'demands/update/:id',
    component: UpdateDemandComponent,
  },
  {
    path: 'demands/create/:id',
    component: CreateDemandComponent,
  },
  {
    path: "demands/products/:id",
    component: DemandProductsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
