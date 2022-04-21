package kaio.test.crud.shared;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import java.lang.reflect.Field;

public class BaseEntity extends PanacheEntityBase {
    public  <T extends BaseEntity> void merge(T subject) {
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
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
    }
}
