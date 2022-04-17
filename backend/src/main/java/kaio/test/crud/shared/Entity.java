package kaio.test.crud.shared;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import kaio.test.crud.client.Client;

import java.lang.reflect.Field;

public class Entity extends PanacheEntityBase {
    public void mergeCustom(Client subject) {
        Class<?> clas = subject.getClass();
        Field[] fields = clas.getDeclaredFields();
        try {
            for (Field field : fields) {
                field.setAccessible(true);
                Object oldValue = field.get(this);
                Object newValue = field.get(subject);
                Object value = (newValue != null) ? newValue: oldValue;
                field.set(this, value);
            }
            System.out.println(this);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
    }
}
