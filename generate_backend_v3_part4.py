import os

base_dir = r"c:\Users\muham\Desktop\ankarapethouse\backend\src\main\java\com\ankarapethouse\api"

files = {
    # ------------------ PAGE CONTENT MODULE ------------------
    "page/PageContent.java": """package com.ankarapethouse.api.page;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "page_contents")
public class PageContent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", length = 500)
    private String seoDescription;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
""",
    "page/PageContentRepository.java": """package com.ankarapethouse.api.page;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PageContentRepository extends JpaRepository<PageContent, UUID> {
    Optional<PageContent> findBySlug(String slug);
}
""",
    "page/dto/PageContentRequest.java": """package com.ankarapethouse.api.page.dto;

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
}
""",
    "page/dto/PageContentResponse.java": """package com.ankarapethouse.api.page.dto;

import com.ankarapethouse.api.page.PageContent;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PageContentResponse {
    private UUID id;
    private String slug;
    private String title;
    private String content;
    private String seoTitle;
    private String seoDescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PageContentResponse from(PageContent entity) {
        if (entity == null) return null;
        PageContentResponse dto = new PageContentResponse();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
""",
    "page/PageContentService.java": """package com.ankarapethouse.api.page;

import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.page.dto.PageContentRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageContentService {

    private final PageContentRepository repository;

    public PageContentService(PageContentRepository repository) {
        this.repository = repository;
    }

    public List<PageContent> getAllPages() {
        return repository.findAll();
    }

    public PageContent getPageBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Page not found: " + slug));
    }

    public PageContent updatePage(String slug, PageContentRequest request) {
        PageContent entity = repository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Page not found: " + slug));
        
        entity.setTitle(request.getTitle());
        entity.setContent(request.getContent());
        entity.setSeoTitle(request.getSeoTitle());
        entity.setSeoDescription(request.getSeoDescription());
        
        return repository.save(entity);
    }
}
""",
    "page/AdminPageController.java": """package com.ankarapethouse.api.page;

import com.ankarapethouse.api.page.dto.PageContentRequest;
import com.ankarapethouse.api.page.dto.PageContentResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/pages")
public class AdminPageController {

    private final PageContentService service;

    public AdminPageController(PageContentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PageContentResponse>> getAllPages() {
        return ResponseEntity.ok(service.getAllPages().stream().map(PageContentResponse::from).collect(Collectors.toList()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PageContentResponse> getPageBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(PageContentResponse.from(service.getPageBySlug(slug)));
    }

    @PutMapping("/{slug}")
    public ResponseEntity<PageContentResponse> updatePage(@PathVariable String slug, @Valid @RequestBody PageContentRequest request) {
        return ResponseEntity.ok(PageContentResponse.from(service.updatePage(slug, request)));
    }
}
""",
    "page/PublicPageController.java": """package com.ankarapethouse.api.page;

import com.ankarapethouse.api.page.dto.PageContentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/pages")
public class PublicPageController {

    private final PageContentService service;

    public PublicPageController(PageContentService service) {
        this.service = service;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PageContentResponse> getPageBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(PageContentResponse.from(service.getPageBySlug(slug)));
    }
}
""",

    # ------------------ SETTINGS MODULE ------------------
    "settings/SiteSettings.java": """package com.ankarapethouse.api.settings;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "site_settings")
public class SiteSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "business_name")
    private String businessName;

    private String phone;
    private String whatsapp;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "google_maps_url", columnDefinition = "TEXT")
    private String googleMapsUrl;

    @Column(name = "instagram_url", columnDefinition = "TEXT")
    private String instagramUrl;

    @Column(name = "site_url")
    private String siteUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
""",
    "settings/SiteSettingsRepository.java": """package com.ankarapethouse.api.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, UUID> {}
""",
    "settings/dto/SiteSettingsRequest.java": """package com.ankarapethouse.api.settings.dto;

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
""",
    "settings/dto/SiteSettingsResponse.java": """package com.ankarapethouse.api.settings.dto;

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
""",
    "settings/SiteSettingsService.java": """package com.ankarapethouse.api.settings;

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
""",
    "settings/AdminSettingsController.java": """package com.ankarapethouse.api.settings;

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
""",
    "settings/PublicSettingsController.java": """package com.ankarapethouse.api.settings;

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
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Part 4 generated successfully.")
