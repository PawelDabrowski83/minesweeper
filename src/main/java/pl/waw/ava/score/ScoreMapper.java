package pl.waw.ava.score;

import org.springframework.stereotype.Component;
import pl.waw.ava.user.UserMapper;

@Component
public class ScoreMapper {

    private final UserMapper userMapper;

    public ScoreMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public ScoreDto mapScoreToDto(Score score) {
        ScoreDto dto = new ScoreDto();
        dto.setId(score.getId());
        dto.setPoints(score.getPoints());
        dto.setCreated(score.getCreated());
        dto.setUser(userMapper.mapUserToDto(score.getUser()));
        return dto;
    }

    public Score mapDtoToScore(ScoreDto dto) {
        Score score = new Score();
        score.setId(dto.getId());
        score.setPoints(dto.getPoints());
        score.setCreated(dto.getCreated());
        score.setUser(userMapper.mapDtoToUser(dto.getUser()));
        return score;
    }

    public ScoreEntity mapScoreToEntity(Score score) {
        ScoreEntity entity = new ScoreEntity();
        entity.setId(score.getId());
        entity.setPoints(score.getPoints());
        entity.setCreated(score.getCreated());
        entity.setUser(userMapper.mapUserToEntity(score.getUser()));
        return entity;
    }

    public Score mapEntityToScore(ScoreEntity entity) {
        Score score = new Score();
        score.setId(entity.getId());
        score.setPoints(entity.getPoints());
        score.setCreated(entity.getCreated());
        score.setUser(userMapper.mapEntityToUser(entity.getUser()));
        return score;
    }

    public ScoreDto mapToDto(ScoreEntity entity) {
        return mapScoreToDto(mapEntityToScore(entity));
    }

    public ScoreEntity mapToEntity(ScoreDto dto) {
        return mapScoreToEntity(mapDtoToScore(dto));
    }
}
