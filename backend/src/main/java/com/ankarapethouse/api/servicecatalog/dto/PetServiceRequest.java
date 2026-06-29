package com.ankarapethouse.api.servicecatalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PetServiceRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String slug;

    @Size(max = 500)
    private String shortDescription;

    private String content;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;

    private Boolean active;
    private Integer sortOrder;
}
