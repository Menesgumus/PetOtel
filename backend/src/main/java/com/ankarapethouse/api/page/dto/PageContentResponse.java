package com.ankarapethouse.api.page.dto;

import com.ankarapethouse.api.page.PageContent;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PageContentResponse {
    private UUID id;
    private String slug;
    private String title;
    private String content;
    private String seoTitle;
    private String seoDescription;
    private UUID coverImageId;
    private String coverImageUrl;
    private UUID secondaryImageId;
    private String secondaryImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PageContentResponse from(PageContent entity) {
        if (entity == null) return null;
        PageContentResponse dto = new PageContentResponse();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        if (entity.getCoverImage() != null) {
            dto.setCoverImageId(entity.getCoverImage().getId());
            dto.setCoverImageUrl(entity.getCoverImage().getUrl());
        }
        if (entity.getSecondaryImage() != null) {
            dto.setSecondaryImageId(entity.getSecondaryImage().getId());
            dto.setSecondaryImageUrl(entity.getSecondaryImage().getUrl());
        }
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
