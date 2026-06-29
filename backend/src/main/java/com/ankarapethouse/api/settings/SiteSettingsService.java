package com.ankarapethouse.api.settings;

import com.ankarapethouse.api.settings.dto.SiteSettingsRequest;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SiteSettingsService {

    private final SiteSettingsRepository repository;

    public SiteSettingsService(SiteSettingsRepository repository) {
        this.repository = repository;
    }

    public SiteSettings getSettings() {
        List<SiteSettings> all = repository.findAll();
        if (all.isEmpty()) {
            SiteSettings settings = new SiteSettings();
            return repository.save(settings);
        }
        return all.get(0);
    }

    public SiteSettings updateSettings(SiteSettingsRequest request) {
        SiteSettings settings = getSettings();
        
        settings.setBusinessName(request.getBusinessName());
        settings.setPhone(request.getPhone());
        settings.setWhatsapp(request.getWhatsapp());
        settings.setEmail(request.getEmail());
        settings.setAddress(request.getAddress());
        settings.setGoogleMapsUrl(request.getGoogleMapsUrl());
        settings.setInstagramUrl(request.getInstagramUrl());
        settings.setSiteUrl(request.getSiteUrl());
        
        return repository.save(settings);
    }
}
