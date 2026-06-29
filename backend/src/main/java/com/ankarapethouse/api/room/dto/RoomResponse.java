package com.ankarapethouse.api.room.dto;

import com.ankarapethouse.api.media.dto.MediaResponse;
import com.ankarapethouse.api.room.Room;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RoomResponse {
    private UUID id;
    private String title;
    private String slug;
    private String description;
    private MediaResponse coverImage;
    private String seoTitle;
    private String seoDescription;
    private boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RoomResponse from(Room entity) {
        if (entity == null) return null;
        RoomResponse dto = new RoomResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        dto.setCoverImage(MediaResponse.from(entity.getCoverImage()));
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setActive(entity.isActive());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
