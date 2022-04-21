package kaio.test.crud.product;

import kaio.test.crud.shared.BaseEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Product extends BaseEntity {
    @Id @GeneratedValue private Long id;
    private String description;
    private Integer unities;
    private Double price;
}
