package pl.waw.ava.score;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.waw.ava.user.UserDto;
import pl.waw.ava.user.UserMapper;
import pl.waw.ava.user.UserRepository;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Controller
@RequestMapping(value = "/score")
public class ScoreController {

    private final ScoreMapper scoreMapper;
    private final ScoreRepository scoreRepository;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public ScoreController(ScoreMapper scoreMapper, ScoreRepository scoreRepository, UserMapper userMapper, UserRepository userRepository) {
        this.scoreMapper = scoreMapper;
        this.scoreRepository = scoreRepository;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/manage", method = RequestMethod.GET)
    public String manageScore() {
        return "allScores";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addScoreGet(Model model) {
        model.addAttribute("scoreDto", new ScoreDto());
        return "formScore";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addScorePost(@Valid @ModelAttribute ScoreDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "formScore";
        }
        scoreRepository.save(scoreMapper.mapToEntity(dto));
        return "redirect:manage";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public String editScoreGet(@PathVariable Long id, Model model) {
        Optional<ScoreEntity> entity = scoreRepository.findById(id);
        if (entity.isPresent()) {
            model.addAttribute("scoreDto", scoreMapper.mapToDto(entity.get()));
        } else {
            model.addAttribute("scoreDto", new ScoreDto());
        }
        return "formScore";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public String editScorePost(@Valid @ModelAttribute ScoreDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "formScore";
        }
        scoreRepository.save(scoreMapper.mapToEntity(dto));
        return "redirect:../manage";
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String deleteScorePost(@PathVariable Long id) {
        scoreRepository.deleteById(id);
        return "redirect:../manage";
    }

    @ModelAttribute("scores")
    public Set<ScoreDto> getAllScores() {
        return scoreRepository.findAll().stream()
                .map(scoreMapper::mapToDto)
                .collect(Collectors.toCollection(TreeSet::new));
    }

    @ModelAttribute("users")
    public Set<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::mapToDto)
                .collect(Collectors.toCollection(TreeSet::new));
    }
}
