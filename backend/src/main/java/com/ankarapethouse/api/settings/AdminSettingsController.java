package com.ankarapethouse.api.settings;

import com.ankarapethouse.api.settings.dto.SiteSettingsRequest;
import com.ankarapethouse.api.settings.dto.SiteSettingsResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/settings")
public class AdminSettingsController {

    private final SiteSettingsService service;

    public AdminSettingsController(SiteSettingsService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<SiteSettingsResponse> getSettings() {
        return ResponseEntity.ok(SiteSettingsResponse.from(service.getSettings()));
    }

    @PutMapping
    public ResponseEntity<SiteSettingsResponse> updateSettings(@Valid @RequestBody SiteSettingsRequest request) {
        return ResponseEntity.ok(SiteSettingsResponse.from(service.updateSettings(request)));
    }
}
