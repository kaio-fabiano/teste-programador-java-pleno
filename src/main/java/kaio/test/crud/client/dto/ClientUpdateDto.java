package kaio.test.crud.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kaio.test.crud.demand.Demand;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.List;

public class ClientUpdateDto extends ClientDto{

    private String name;
    @Pattern(regexp = "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})")
    private String cpf;
    @Pattern(regexp = "^\\([1-9]{2}\\) (?:[2-8]|9[1-9])[0-9]{3}\\-[0-9]{4}$")
    private String phone;
    @Email
    private String mail;
}
