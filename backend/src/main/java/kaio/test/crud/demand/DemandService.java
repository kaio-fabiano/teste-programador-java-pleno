package kaio.test.crud.demand;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import kaio.test.crud.client.Client;
import kaio.test.crud.demand.dto.DemandDto;
import kaio.test.crud.shared.http.ValidateErrors;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class DemandService {
    @Inject
    private DemandMapper demandMapper;

    @Inject
    private Validator validator;

    @Inject
    private ValidateErrors errors;

    public List<Demand> listDemands(int page, int limit){
        PanacheQuery<Demand> productPages = Demand.find("1=1").page(page, limit);
        return productPages.list();
    }

    public Demand createDemand(DemandDto demandDto) {
        Set<ConstraintViolation<DemandDto>> violations = validator.validate(demandDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new WebApplicationException(message, 422);
        }
        this.clientExists(demandDto.getClient_id());
        try {
            Demand demand = demandMapper.toResource(demandDto);
            demand.persistAndFlush();
            return demand;
        }
        catch (Exception err){
            throw err;
        }
    }

    public Demand updateDemand(Long id, DemandDto demandDto ){
        Set<ConstraintViolation<DemandDto>> violations = validator.validate(demandDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new ClientErrorException(message, Response.status(422).build());
        }
        this.clientExists(demandDto.getClient_id());
        try {
            Demand demand = Demand.findById(id);
            if (demand == null){
                throw new WebApplicationException("Demand Not Found", 404);
            } else {
                demand.merge(demandMapper.toResource(demandDto));
                demand.persist();
                return demand;
            }
        } catch (Exception err){
            throw err;
        }
    }

    public Response deleteDemand(Long id) {
        try {
            Demand.delete("id", id);
            return Response.status(200,"Delete Success").build();
        } catch (Exception err){
            throw err;
        }
    }

    public Exception clientExists(Long id) {
        Client client = Client.findById(id);
        System.out.println(client);
        if (client == null) {
            throw new WebApplicationException("Client Not Found", 404);
        }
        return null;
    }
}
