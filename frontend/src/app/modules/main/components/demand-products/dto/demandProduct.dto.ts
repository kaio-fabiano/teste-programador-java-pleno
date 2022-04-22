export class DemandProductDto {
  products_ids?: number[];
  constructor (ids:number[]){
      this.products_ids = ids;
  }
}
