package com.ankarapethouse.api.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class BlogRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String slug;

    @Size(max = 500)
    private String summary;

    @NotBlank
    private String content;

    private UUID coverImageId;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;

    private String status;
}
