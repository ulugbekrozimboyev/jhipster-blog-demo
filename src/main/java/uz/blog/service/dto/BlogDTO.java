package uz.blog.service.dto;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.blog.domain.Blog} entity.
 */
public class BlogDTO implements Serializable {

    private Long id;

    private String title;

    private String alias;

    private String mainImg;

    @Nullable
    private MultipartFile mainImgFile;

    private String content;

    private Instant createdAt;

    private Long createdBy;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getMainImg() {
        return mainImg;
    }

    public void setMainImg(String mainImg) {
        this.mainImg = mainImg;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    @Nullable
    public MultipartFile getMainImgFile() {
        return mainImgFile;
    }

    public void setMainImgFile(@Nullable MultipartFile mainImgFile) {
        this.mainImgFile = mainImgFile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlogDTO blogDTO = (BlogDTO) o;
        if (blogDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blogDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlogDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", alias='" + getAlias() + "'" +
            ", mainImg='" + getMainImg() + "'" +
            ", content='" + getContent() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", createdBy=" + getCreatedBy() +
            "}";
    }
}
