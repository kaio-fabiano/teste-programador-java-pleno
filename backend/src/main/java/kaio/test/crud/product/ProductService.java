package kaio.test.crud.product;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import kaio.test.crud.product.dto.ProductCreateDto;
import kaio.test.crud.product.dto.ProductDto;
import kaio.test.crud.shared.http.ValidateErrors;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ProductService {
    @Inject
    private ProductMapper productMapper;

    @Inject
    private Validator validator;

    @Inject
    private ValidateErrors errors;

    public List<Product> listProducts(int limit, int page){
        PanacheQuery<Product> productPages = Product.find("1=1").page(page, limit);
        return productPages.list();
    }

    public List<Product> listAllProducts(){
        return Product.listAll();
    }

    public Product createProduct( ProductCreateDto productDto ) {
        Set<ConstraintViolation<ProductCreateDto>> violations = validator.validate(productDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new WebApplicationException(message, 422);
        }
        try {
            Product product = this.productMapper.toResource(productDto);
            product.persistAndFlush();
            return product;
        }
        catch (Exception error){
            throw error;
        }
    }

    public Product updateProduct(Long id, ProductDto productDto ){
        Set<ConstraintViolation<ProductDto>> violations = validator.validate(productDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new WebApplicationException(message, 422);
        }
        try {
            Product product = Product.findById(id);
            if (product == null){
                throw new WebApplicationException("Product Not Found", 404);
            } else {
                product.merge(productMapper.toResource(productDto));
                product.persist();
                return product;
            }
        } catch (Exception error){
            throw error;
        }
    }

    public Response deleteProduct(Long id) {
        try {
            Product.delete("id", id);
            return Response.status(200,"Delete Success").build();
        } catch (Exception error){
            throw error;
        }
    }
}
