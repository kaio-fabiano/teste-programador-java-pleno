package kaio.test.crud.client;

import kaio.test.crud.client.dto.ClientDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "cdi")
public interface ClientMapper {
    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);
    Client toResource(ClientDto clientDto);
}
