import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  urlApi = environment.urlToApi;
  constructor(private httpClient: HttpClient) { }
  
  public listAll( path: string ) {
    return this.httpClient.get(this.urlApi+path);
  }
  
  public create( path: string, object : any ) {
    return this.httpClient.post(this.urlApi+path, object);
  }
  
  public update( path: string, id: string, object : any ) {
    return this.httpClient.post(this.urlApi+path+id, object);
  }
  
  public delete( path: string, id: string ) {
    return this.httpClient.delete(this.urlApi+path+id);
  }
}
