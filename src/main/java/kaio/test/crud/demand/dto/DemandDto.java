package kaio.test.crud.demand.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jboss.resteasy.reactive.DateFormat;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemandDto {
    @NotBlank
    private String description;
    @NotNull
    @Min(value = 0L, message = "Client id Must be Positive")
    private Long client_id;
}
