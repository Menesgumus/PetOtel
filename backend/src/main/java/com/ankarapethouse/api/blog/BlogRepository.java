package com.ankarapethouse.api.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface BlogRepository extends JpaRepository<BlogPost, UUID> {
    Page<BlogPost> findByDeletedAtIsNull(Pageable pageable);
    Page<BlogPost> findByStatusAndDeletedAtIsNull(String status, Pageable pageable);
    Optional<BlogPost> findByIdAndDeletedAtIsNull(UUID id);
    Optional<BlogPost> findBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
    java.util.List<BlogPost> findByCoverImageId(UUID coverImageId);
}
