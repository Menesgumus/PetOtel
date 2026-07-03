package com.ankarapethouse.api.blog.dto;

import com.ankarapethouse.api.blog.BlogPost;
import com.ankarapethouse.api.media.dto.MediaResponse;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BlogResponse {
    private UUID id;
    private String title;
    private String slug;
    private String summary;
    private String content;
    private MediaResponse coverImage;
    private UUID coverImageId;
    private String coverImageUrl;
    private String seoTitle;
    private String seoDescription;
    private String status;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BlogResponse from(BlogPost entity) {
        if (entity == null) return null;
        BlogResponse dto = new BlogResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setSummary(entity.getSummary());
        dto.setContent(entity.getContent());
        dto.setCoverImage(MediaResponse.from(entity.getCoverImage()));
        if (entity.getCoverImage() != null) {
            dto.setCoverImageId(entity.getCoverImage().getId());
            dto.setCoverImageUrl(entity.getCoverImage().getUrl());
        }
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setStatus(entity.getStatus());
        dto.setPublishedAt(entity.getPublishedAt());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
