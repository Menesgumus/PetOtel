package com.ankarapethouse.api.room.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class RoomRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String slug;

    private String description;

    private UUID coverImageId;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;

    private Boolean active;
    private Integer sortOrder;
}
