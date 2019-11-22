package pl.waw.ava.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import java.util.Optional;

public class UserConverter implements Converter<String, UserDto> {

    @Autowired
    UserMapper userMapper;
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDto convert(String s) {

        Optional<UserEntity> entity = userRepository.findById(Long.parseLong(s));
        return entity.map(userMapper::mapToDto).orElse(null);
    }
}
