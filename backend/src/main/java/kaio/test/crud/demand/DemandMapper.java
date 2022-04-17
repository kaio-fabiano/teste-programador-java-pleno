package kaio.test.crud.demand;

import kaio.test.crud.demand.dto.DemandDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "cdi")
public interface DemandMapper {
    DemandMapper INSTANCE = Mappers.getMapper(DemandMapper.class);
    Demand toResource(DemandDto demandDto);
}
