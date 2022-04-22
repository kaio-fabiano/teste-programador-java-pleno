package kaio.test.crud.product;

import kaio.test.crud.product.dto.ProductCreateDto;
import kaio.test.crud.product.dto.ProductDto;
import kaio.test.crud.shared.http.ResponseMessage;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/products")
public class ProductResource {
    @Inject
    private ProductMapper productMapper;

    @Inject
    private ProductService productService;

    @Inject
    private ResponseMessage responseMessage;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> index(@QueryParam("limit") int limit,@QueryParam("page")  int page){
        if (page == 0) {
            page = 1;
        }
        if (limit == 0){
            return productService.listAllProducts();
        }
        return productService.listProducts(limit, page - 1);
    }

    @POST
    @Transactional
    public Response store(ProductCreateDto insertProduct) {
        try {
            try {
                return Response.ok(productService.createProduct(insertProduct)).build();
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
        catch (Exception error){
            throw  error;
        }
    }

    @Transactional
    @PUT
    @Path("/{id}")
    public Response update( Long id, ProductDto productDto ){
        try {
            return Response.ok(productService.updateProduct(id, productDto)).build();
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
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            return productService.deleteProduct(id);
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
