package com.ankarapethouse.api.settings;

import com.ankarapethouse.api.settings.dto.SiteSettingsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/site-settings")
public class PublicSettingsController {

    private final SiteSettingsService service;

    public PublicSettingsController(SiteSettingsService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<SiteSettingsResponse> getSettings() {
        return ResponseEntity.ok(SiteSettingsResponse.from(service.getSettings()));
    }
}
