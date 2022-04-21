package kaio.test.crud.demand;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import kaio.test.crud.product.Product;
import kaio.test.crud.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Entity
public class Demand extends BaseEntity {
    public Demand(){
        this.date = new Date();
    }

    @Id @GeneratedValue private Long id;
    private Long client_id;
    private Date date;
    private String description;
    @ManyToMany
    @JoinTable(
            name = "demand_product",
            joinColumns = @JoinColumn(
                    name = "demand_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "product_id",
                    referencedColumnName = "id"
            )
    )
    public List<Product> products;
    public double getTotal(){
        double total = 0;
        if (products != null){
            for (Product product : products) {
                total += product.getPrice();
            }
        }
        return total;
    }
    public void merge(Demand subject){
        this.setClient_id(subject.client_id);
        this.setDescription(subject.description);
        this.setProducts(subject.products);
    }
}
