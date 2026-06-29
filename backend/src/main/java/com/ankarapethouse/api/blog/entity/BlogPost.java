package com.ankarapethouse.api.blog.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
@Getter @Setter
public class BlogPost extends BaseEntity {
    private String title;
    private String slug;
    private String summary;
    private String content;
    private String status = "DRAFT";
    private LocalDateTime publishedAt;
    private LocalDateTime deletedAt;
}
