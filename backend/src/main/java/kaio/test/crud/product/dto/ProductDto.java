package kaio.test.crud.product.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDto {
    private String description;
    private Integer unities;
    private Double price;
}
