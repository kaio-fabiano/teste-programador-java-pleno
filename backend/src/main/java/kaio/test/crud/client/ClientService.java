package kaio.test.crud.client;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import kaio.test.crud.client.dto.ClientCreateDto;
import kaio.test.crud.client.dto.ClientUpdateDto;
import kaio.test.crud.demand.Demand;
import kaio.test.crud.shared.http.ValidateErrors;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ClientService {
    @Inject
    private ClientMapper clientMapper;

    @Inject
    private Validator validator;

    @Inject
    private ValidateErrors errors;

    public List<Client> listClients(int page, int limit){
        PanacheQuery<Client> clientsPages = Client.find("1=1").page(page, limit);
        return clientsPages.list();
    }

    public List<Demand> listDemandsByClientId( Long id, int limit, int page) {
        Client client = Client.findById(id);
        if (client == null) {
            throw  new NotFoundException("Client no Found");
        }
        return Demand.find("client_id",id).page(page,limit).list();
    }

    public Client createClient( ClientCreateDto clientDto ) {
        Set<ConstraintViolation<ClientCreateDto>> violations = validator.validate(clientDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new WebApplicationException(message, 422);
        }
        this.createCpfIsUnique(clientDto.getCpf());
        this.createEmailIsUnique(clientDto.getMail());
        try {
            Client client = this.clientMapper.toResource(clientDto);
            client.persistAndFlush();
            return client;
        }
        catch (Exception error){
            throw error;
        }
    }

    public Client updateClient(Long id, ClientUpdateDto clientDto ){
        Set<ConstraintViolation<ClientUpdateDto>> violations = validator.validate(clientDto);
        if (!violations.isEmpty()) {
            String message = errors.format(violations);
            throw new ClientErrorException(message, Response.status(422).build());
        }
        this.updateCpfIsUnique(clientDto.getCpf(), id);
        this.updateEmailIsUnique(clientDto.getMail(), id);
        try {
            Client client = Client.findById(id);
            if (client == null){
                throw new WebApplicationException("Client Not Found", 404);
            } else {
                client.merge(clientMapper.toResource(clientDto));
                client.persistAndFlush();
                return client;
            }
        } catch (Exception error){
            throw error;
        }
    }

    public Response deleteClient(Long id) {
        try {
            Client.delete("id", id);
            return Response.status(200,"Delete Success").build();
        } catch (Exception error){
            throw error;
        }
    }

    public Exception createCpfIsUnique(String value){
        Client isClient = Client.find("cpf",value).firstResult();
        if (isClient != null){
            throw new WebApplicationException("CPF Is Already Used", 422);
        }
        return null;
    }

    public Exception createEmailIsUnique(String value){
        Client isClient = Client.find("mail",value).firstResult();
        if (isClient != null){
            throw new WebApplicationException("Email Is Already Used", 422);
        }
        return null;
    }

    public Exception updateEmailIsUnique(String value,Long id){
        Client isClient = Client.find("mail",value).firstResult();
        if (isClient != null){
            if (isClient.getId() != id) {
                throw new WebApplicationException("Email Is Already Used", 422);
            }
        }
        return null;
    }

    public Exception updateCpfIsUnique(String value,Long id){
        Client isClient = Client.find("cpf",value).firstResult();
        if (isClient != null){
            if (isClient.getId() != id) {
                throw new WebApplicationException("Cpf Is Already Used", 422);
            }
        }
        return null;
    }
}
