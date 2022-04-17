package kaio.test.crud.demand_product.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;
@Getter
public class DemandProductDto {
    @NotNull
    private List<Long> products_ids;
}
