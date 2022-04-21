package kaio.test.crud.demand_product;

import kaio.test.crud.demand.Demand;
import kaio.test.crud.demand_product.dto.DemandProductDto;
import kaio.test.crud.product.Product;
import kaio.test.crud.shared.http.ValidateErrors;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class DemandProductService {
    @Inject
    private Validator validator;

    @Inject
    private ValidateErrors errors;

    public List<Product> listDemandProducts(Long id, int page, int limit){
        Demand demand = Demand.findById(id);
        if (demand == null) {
            throw new NotFoundException();
        }
        return Product.find("SELECT p FROM Product p INNER JOIN p.demands pd WHERE pd.id = ?1", demand.getId()).page(page, limit).list();
    }

    public List<Product> createDemandProducts(Long id, DemandProductDto demandProductDto){
        Set<ConstraintViolation<DemandProductDto>> violations = validator.validate(demandProductDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new ClientErrorException(message, Response.status(422).build());
        }
        this.demandExists(id);
        this.productExists(demandProductDto.getProducts_ids());
        try {
            Demand demand = Demand.findById(id);
            List<Product> products = Product.list("id in ?1", demandProductDto.getProducts_ids());
            demand.setProducts(products);
            demand.persistAndFlush();
            return products;
        }
        catch (Exception error){
            throw error;
        }

    }
    public Exception demandExists(Long id) {
        Demand demand = Demand.findById(id);
        if (demand == null){
            throw new WebApplicationException("Client Not Found", 404);
        }
        return null;
    }
    public Exception productExists(List productsIds) {
        for (Object productId : productsIds) {
            if (Product.findById(productId) == null){
                throw new WebApplicationException("Product "+productId.toString()+" Not Found", 404);
            }
        }
        return null;
    }

}
