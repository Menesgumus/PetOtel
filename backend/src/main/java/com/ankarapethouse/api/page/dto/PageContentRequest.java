package com.ankarapethouse.api.page.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PageContentRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    private String content;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;
    
    private java.util.UUID coverImageId;
    
    private java.util.UUID secondaryImageId;
}
