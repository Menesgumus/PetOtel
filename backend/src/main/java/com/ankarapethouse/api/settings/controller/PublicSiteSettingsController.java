package com.ankarapethouse.api.settings.controller;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/site-settings")
public class PublicSiteSettingsController {
    @GetMapping
    public Map<String, String> getSettings() {
        return Map.of("businessName", "Ankara Pet House");
    }
}
