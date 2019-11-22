package pl.waw.ava.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserController(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/manage")
    public String manageUser() {
        return "allUsers";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addUserGet(Model model) {
        model.addAttribute("userDto", new UserDto());
        return "formUser";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addUserPost(@Valid @ModelAttribute UserDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "formUser";
        }
        userRepository.save(userMapper.mapToEntity(dto));
        return "redirect:manage";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public String editUserGet(@PathVariable Long id, Model model) {
        Optional<UserEntity> entity = userRepository.findById(id);
        if (!entity.isPresent()) {
            model.addAttribute("userDto", new UserDto());
        } else {
            model.addAttribute("userDto", userMapper.mapToDto(entity.get()));
        }
        return "formUser";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public String editUserPost(@Valid @ModelAttribute UserDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "formUser";
        }
        userRepository.save(userMapper.mapToEntity(dto));
        return "redirect:../manage";
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "redirect:../manage";
    }

    @ModelAttribute("users")
    public Set<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::mapToDto)
                .collect(Collectors.toCollection(TreeSet::new));
    }
}
