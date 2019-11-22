package pl.waw.ava.score;

import pl.waw.ava.user.UserDto;
import pl.waw.ava.user.UserEntity;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.Objects;

public class ScoreDto implements Comparable<ScoreDto>{

    private Long id;
    @NotNull
    @PositiveOrZero
    private int points;
    @NotNull
    private UserDto user;
    private LocalDateTime created;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScoreDto)) return false;
        ScoreDto scoreDto = (ScoreDto) o;
        return getPoints() == scoreDto.getPoints() &&
                getUser().equals(scoreDto.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPoints(), getUser());
    }

    @Override
    public int compareTo(ScoreDto o) {
        return Integer.compare(this.getPoints(), o.getPoints());
    }
}
