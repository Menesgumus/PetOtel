package com.ankarapethouse.api.settings.dto;

import com.ankarapethouse.api.settings.SiteSettings;
import lombok.Data;
import java.util.UUID;

@Data
public class SiteSettingsResponse {
    private UUID id;
    private String businessName;
    private String phone;
    private String whatsapp;
    private String email;
    private String address;
    private String googleMapsUrl;
    private String instagramUrl;
    private String siteUrl;

    public static SiteSettingsResponse from(SiteSettings entity) {
        if (entity == null) return null;
        SiteSettingsResponse dto = new SiteSettingsResponse();
        dto.setId(entity.getId());
        dto.setBusinessName(entity.getBusinessName());
        dto.setPhone(entity.getPhone());
        dto.setWhatsapp(entity.getWhatsapp());
        dto.setEmail(entity.getEmail());
        dto.setAddress(entity.getAddress());
        dto.setGoogleMapsUrl(entity.getGoogleMapsUrl());
        dto.setInstagramUrl(entity.getInstagramUrl());
        dto.setSiteUrl(entity.getSiteUrl());
        return dto;
    }
}
