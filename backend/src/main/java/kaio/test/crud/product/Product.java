package kaio.test.crud.product;

import kaio.test.crud.demand.Demand;
import kaio.test.crud.shared.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "product")
public class Product extends BaseEntity {
    @ManyToMany( cascade = CascadeType.ALL ) @Fetch(FetchMode.JOIN)
    @JoinTable(
            name = "demand_product",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "demand_id",
                    referencedColumnName = "id"
            )
    )
    private List<Demand> demands;
    @Id @GeneratedValue private Long id;
    private String description;
    private Integer unities;
    private Double price;
}
