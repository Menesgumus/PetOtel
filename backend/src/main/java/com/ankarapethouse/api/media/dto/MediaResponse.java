package com.ankarapethouse.api.media.dto;

import com.ankarapethouse.api.media.MediaAsset;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MediaResponse {
    private UUID id;
    private String originalFilename;
    private String url;
    private String mimeType;
    private Long sizeBytes;
    private Integer width;
    private Integer height;
    private String altText;
    private java.util.List<String> usages;
    private LocalDateTime createdAt;

    public static MediaResponse from(MediaAsset entity) {
        if (entity == null) return null;
        MediaResponse dto = new MediaResponse();
        dto.setId(entity.getId());
        dto.setOriginalFilename(entity.getOriginalFilename());
        dto.setUrl(entity.getUrl());
        dto.setMimeType(entity.getMimeType());
        dto.setSizeBytes(entity.getSizeBytes());
        dto.setWidth(entity.getWidth());
        dto.setHeight(entity.getHeight());
        dto.setAltText(entity.getAltText());
        dto.setUsages(new java.util.ArrayList<>());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
