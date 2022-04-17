import { CrudService } from "src/app/modules/shared/services/crud.service";
import { Client } from "./models/client.model";

export class ClientCrud {
    private path: string = "/products/";
    
    constructor(private crudService : CrudService){};
    
    public  listClients(){
        return this.crudService.listAll(this.path);
    }
    
    public  createClient( client: Client ) {
        return this.crudService.create(this.path, client);
    }
    
    public updateClient( id: number, client: Client ) {
        return this.crudService.update(this.path, id.toString(), client);
    }
    
    public deleteClient( id: number ) {
        return this.crudService.delete(this.path, id.toString()).subscribe({
            next: (result: any) => { return result},
            error: (eror: any) => { return eror},
        });
    }
}