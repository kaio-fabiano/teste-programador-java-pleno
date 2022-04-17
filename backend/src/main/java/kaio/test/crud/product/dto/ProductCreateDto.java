package kaio.test.crud.product.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductCreateDto extends ProductDto {
    @NotBlank
    private String description;
    @NotNull
    private int unities;
    @NotNull
    private double price;
}
