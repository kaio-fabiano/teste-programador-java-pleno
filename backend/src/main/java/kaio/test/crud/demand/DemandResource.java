package kaio.test.crud.demand;

import kaio.test.crud.demand.dto.DemandDto;
import kaio.test.crud.shared.http.ResponseMessage;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/demands")
public class DemandResource {
    @Inject
    private DemandService demandService;

    @Inject
    private ResponseMessage responseMessage;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Demand> index(@QueryParam("page") int page, @QueryParam("limit") int limit){
        if (page == 0) {
            page = 1;
        }
        if (limit == 0) {
            limit = 10;
        }
        return demandService.listDemands(page - 1, limit);
    }

    @Transactional
    @POST
    public Response store(DemandDto demandDto) {
        try {
            return Response.ok(demandService.createDemand(demandDto)).build();
        }
        catch (WebApplicationException error){
            if (error.getResponse().getStatus() == 422){
                return responseMessage.responseMessage(422,error.getMessage());
            }
            if (error.getResponse().getStatus() == 404){
                return responseMessage.responseMessage(404,error.getMessage());
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
    public Response update(Long id, DemandDto demandDto ){
        try {
           return Response.ok(demandService.updateDemand(id, demandDto)).build();
        }
        catch (WebApplicationException error){
            if (error.getResponse().getStatus() == 422){
                return responseMessage.responseMessage(422,error.getMessage());
            }
            if (error.getResponse().getStatus() == 404){
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
            return demandService.deleteDemand(id);
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
