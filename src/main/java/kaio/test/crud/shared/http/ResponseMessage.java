package kaio.test.crud.shared.http;

import lombok.AllArgsConstructor;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@AllArgsConstructor
@ApplicationScoped
public class ResponseMessage {

    public Response responseMessage(int error, Object message){
        return Response.status(error).entity(message)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .build();
    }

}
