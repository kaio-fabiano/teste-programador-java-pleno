package kaio.test.crud.client;

import kaio.test.crud.demand.Demand;
import kaio.test.crud.shared.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@ToString
@Table(name = "client")
public class Client extends BaseEntity {
    @Id @GeneratedValue private Long id;
    private String name;
    private String cpf;
    private String phone;
    private String mail;
    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER )
    @JoinColumn(
            name = "client_id",
            referencedColumnName = "id"
    )
    private List<Demand> demands;
}
