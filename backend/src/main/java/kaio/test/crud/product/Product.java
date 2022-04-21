package kaio.test.crud.product;

import kaio.test.crud.shared.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {
    @Id @GeneratedValue private Long id;
    private String description;
    private int unities;
    private double price;

    public void merge(Product subject){
        this.setDescription(subject.description);
        this.setUnities(subject.unities);
        this.setPrice(subject.price);
    }
}
