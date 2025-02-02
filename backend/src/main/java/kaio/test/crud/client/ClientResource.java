package kaio.test.crud.client;

import kaio.test.crud.client.dto.ClientCreateDto;
import kaio.test.crud.client.dto.ClientUpdateDto;
import kaio.test.crud.demand.Demand;
import kaio.test.crud.shared.http.ResponseMessage;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/clients")
public class ClientResource {
    @Inject
    private ClientService clientService;
    @Inject
    private ResponseMessage responseMessage;

    @Path("/{id}/demands")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Demand> resolveDemands(@PathParam("id") Long id, @QueryParam("limit") int limit,@QueryParam("page") int page) {
        if (limit == 0) {
            limit = 10;
        }
        return clientService.listDemandsByClientId(id, limit, page - 1);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Client> index(@QueryParam("limit") int limit,@QueryParam("page")  int page){
        if (page == 0) {
            page = 1;
        }
        if (limit == 0) {
            limit = 10;
        }
        return clientService.listClients(page - 1, limit);
    }

    @Transactional
    @POST
    public Response store( ClientCreateDto clientDto) {
        try {
            return Response.ok(clientService.createClient(clientDto)).build();
        }
        catch (WebApplicationException error){
            if (error.getResponse().getStatus() == 422){
                return responseMessage.responseMessage(422,error.getMessage());
            }
            throw error;
        }
        catch (Exception error){
            throw error;
        }
    }

    @Transactional
    @PUT
    @Path("/{id}")
    public Response update( Long id, ClientUpdateDto clientDto ){
        try {
            return Response.ok(clientService.updateClient(id, clientDto)).build();
        }
        catch (WebApplicationException error) {
            if (error.getResponse().getStatus() == 422) {
                return responseMessage.responseMessage(422,error.getMessage());
            }
            if (error.getResponse().getStatus() == 404) {
                return responseMessage.responseMessage(404,error.getMessage());
            }
            throw error;
        }
        catch (Exception error) {
            throw error;
        }
    }

    @Transactional
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            return clientService.deleteClient(id);
        }
        catch (WebApplicationException error) {
            if (error.getResponse().getStatus() == 404) {
                return responseMessage.responseMessage(404,error.getMessage());
            }
            throw error;
        }
        catch (Exception err) {
            throw err;
        }
    }
}
