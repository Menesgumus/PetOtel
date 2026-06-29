package com.ankarapethouse.api.settings.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SiteSettingsRequest {
    @Size(max = 255)
    private String businessName;

    @Size(max = 100)
    private String phone;

    @Size(max = 100)
    private String whatsapp;

    @Email
    @Size(max = 255)
    private String email;

    private String address;
    private String googleMapsUrl;
    private String instagramUrl;

    @Size(max = 255)
    private String siteUrl;
}
