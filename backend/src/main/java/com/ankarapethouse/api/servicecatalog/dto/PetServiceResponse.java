package com.ankarapethouse.api.servicecatalog.dto;

import com.ankarapethouse.api.servicecatalog.PetServiceEntity;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PetServiceResponse {
    private UUID id;
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private String seoTitle;
    private String seoDescription;
    private boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PetServiceResponse from(PetServiceEntity entity) {
        if (entity == null) return null;
        PetServiceResponse dto = new PetServiceResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setShortDescription(entity.getShortDescription());
        dto.setContent(entity.getContent());
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setActive(entity.isActive());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
