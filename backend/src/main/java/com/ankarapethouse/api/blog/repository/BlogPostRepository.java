package com.ankarapethouse.api.blog.repository;
import com.ankarapethouse.api.blog.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    Optional<BlogPost> findBySlugAndDeletedAtIsNullAndStatus(String slug, String status);
    List<BlogPost> findAllByDeletedAtIsNullAndStatus(String status);
}
