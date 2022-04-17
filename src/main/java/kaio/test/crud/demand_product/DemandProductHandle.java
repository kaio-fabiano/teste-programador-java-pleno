package kaio.test.crud.demand_product;

import kaio.test.crud.demand.Demand;
import kaio.test.crud.demand_product.dto.DemandProductDto;
import kaio.test.crud.product.Product;
import kaio.test.crud.product.dto.ProductDto;
import kaio.test.crud.shared.http.ResponseMessage;
import org.jboss.logging.annotations.Param;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/demand/{id}/products")
public class DemandProductHandle {
    @Inject
    private DemandProductService demandProductService;

    @Inject
    private ResponseMessage responseMessage;

    @GET
    public List<Product> index(@PathParam("id") Long id){
        Demand demand = Demand.findById(id);
        return demand.getProducts();
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
            System.out.println(error);
            throw error;
        }
        catch (Exception error) {
            throw error;
        }
    }
}
