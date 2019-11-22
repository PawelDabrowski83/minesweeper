package pl.waw.ava.user;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto mapUserToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setCreated(user.getCreated());
        return dto;
    }

    public User mapDtoToUser(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setCreated(dto.getCreated());
        return user;
    }

    public UserEntity mapUserToEntity(User user) {
        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setCreated(user.getCreated());
        return entity;
    }

    public User mapEntityToUser(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setFirstName(entity.getFirstName());
        user.setLastName(entity.getLastName());
        user.setCreated(entity.getCreated());
        return user;
    }

    public UserDto mapToDto(UserEntity entity) {
        return mapUserToDto(mapEntityToUser(entity));
    }

    public UserEntity mapToEntity(UserDto dto) {
        return mapUserToEntity(mapDtoToUser(dto));
    }
}
