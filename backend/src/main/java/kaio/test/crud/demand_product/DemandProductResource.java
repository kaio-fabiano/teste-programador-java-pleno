package kaio.test.crud.demand_product;

import kaio.test.crud.demand.Demand;
import kaio.test.crud.demand_product.dto.DemandProductDto;
import kaio.test.crud.product.Product;
import kaio.test.crud.shared.http.ResponseMessage;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/demands/{id}/products")
public class DemandProductResource {
    @Inject
    private DemandProductService demandProductService;

    @Inject
    private ResponseMessage responseMessage;

    @GET
    public List<Product> index(@PathParam("id") Long id, @QueryParam("page") int page,@QueryParam("limit") int limit) {
      if (limit == 0){
          limit = 10;
      }
      return demandProductService.listDemandProducts(id, page, limit);
    }

    @POST
    @Transactional
    public Response store(@PathParam("id") Long id, DemandProductDto demandProductDto){
        try {
            return Response.ok(demandProductService.createDemandProducts(id, demandProductDto)).build();
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
}
