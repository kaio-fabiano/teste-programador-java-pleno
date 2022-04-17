package kaio.test.crud.shared.http;

import lombok.AllArgsConstructor;

import javax.enterprise.context.ApplicationScoped;
import javax.validation.ConstraintViolation;
import java.util.Set;

@AllArgsConstructor
@ApplicationScoped
public class ValidateErrors {
    public <T> String format(Set<ConstraintViolation<T>> violations) {
        String message = "";
        for (ConstraintViolation<T> v: violations) {
            message += String.format("%s: %s", v.getPropertyPath(), v.getMessage());
        }
        return message;
    }
}
