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
    public List<Product> index(){
        return Product.listAll();
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
            Product product = Product.findById(id);
            if (product == null){
                throw new NotFoundException("Product Not Found");
            } else {
                product.merge(productMapper.toResource(productDto));
                product.persist();
                return Response.ok(product).build();
            }
        } catch (Exception err){
            System.out.println(err);
            throw new BadRequestException("Error While Update Client");
        }
    }

    @Transactional
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            Product product = Product.findById(id);
            if (product == null) {
                throw new WebApplicationException("Product with id " + id + " does not exist.", Response.Status.NOT_FOUND);
            }
            product.delete();
            return Response.status(204,"Delete Sucess").build();
        } catch (Exception err){
            System.out.println(err);
            throw new BadRequestException("Error While Update Product");
        }
    }
}
