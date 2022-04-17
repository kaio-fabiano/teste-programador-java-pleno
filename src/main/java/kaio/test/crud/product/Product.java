package kaio.test.crud.product;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import kaio.test.crud.client.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends kaio.test.crud.shared.Entity {
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
