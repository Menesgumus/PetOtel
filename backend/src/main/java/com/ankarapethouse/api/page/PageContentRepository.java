package com.ankarapethouse.api.page;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PageContentRepository extends JpaRepository<PageContent, UUID> {
    Optional<PageContent> findBySlug(String slug);
    java.util.List<PageContent> findByCoverImageId(UUID coverImageId);
    java.util.List<PageContent> findBySecondaryImageId(UUID secondaryImageId);
}
