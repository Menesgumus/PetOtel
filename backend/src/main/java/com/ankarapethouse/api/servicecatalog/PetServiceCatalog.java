package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.media.MediaAsset;
import com.ankarapethouse.api.servicecatalog.dto.PetServiceRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.ankarapethouse.api.media.MediaRepository;

@Service
public class PetServiceCatalog {
    private static final Logger log = LoggerFactory.getLogger(PetServiceCatalog.class);
    
    private static final List<String> RESERVED_SLUGS = Arrays.asList(
        "admin", "blog", "odalar", "hizmetlerimiz", "hakkimizda", "iletisim", 
        "sitemap.xml", "robots.txt", "api", "uploads", "login", "dashboard", 
        "settings", "media", "services", "rooms", "pages"
    );

    private final PetServiceRepository repository;
    private final MediaRepository mediaRepository;

    public PetServiceCatalog(PetServiceRepository repository, MediaRepository mediaRepository) {
        this.repository = repository;
        this.mediaRepository = mediaRepository;
    }

    public Page<PetServiceEntity> getAdminServices(Pageable pageable) {
        return repository.findByDeletedAtIsNull(pageable);
    }

    public List<PetServiceEntity> getPublicServices() {
        return repository.findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    }

    public PetServiceEntity getServiceById(UUID id) {
        return repository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
    }

    public PetServiceEntity getServiceBySlug(String slug) {
        return repository.findBySlugAndActiveTrueAndDeletedAtIsNull(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
    }

    @Transactional
    public PetServiceEntity createService(PetServiceRequest request) {
        String slug = prepareSlug(request.getTitle(), request.getSlug(), null);
        
        PetServiceEntity entity = new PetServiceEntity();
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    @Transactional
    public PetServiceEntity updateService(UUID id, PetServiceRequest request) {
        log.info("updateService called for id={}, coverImageId={}", id, request.getCoverImageId());
        PetServiceEntity entity = getServiceById(id);
        String slug = prepareSlug(request.getTitle(), request.getSlug(), id);
        
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        PetServiceEntity saved = repository.save(entity);
        log.info("Saved service id={}, coverImage={}", saved.getId(), saved.getCoverImage() != null ? saved.getCoverImage().getId() : "NULL");
        return saved;
    }

    @Transactional
    public void updateActiveStatus(UUID id, boolean isActive) {
        PetServiceEntity entity = getServiceById(id);
        entity.setActive(isActive);
        repository.save(entity);
    }

    @Transactional
    public void updateSortOrder(UUID id, Integer sortOrder) {
        PetServiceEntity entity = getServiceById(id);
        entity.setSortOrder(sortOrder != null ? sortOrder : 0);
        repository.save(entity);
    }

    @Transactional
    public void deleteService(UUID id) {
        PetServiceEntity entity = getServiceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        repository.save(entity);
    }

    private void mapRequestToEntity(PetServiceRequest request, PetServiceEntity entity) {
        entity.setTitle(request.getTitle());
        entity.setShortDescription(request.getShortDescription());
        entity.setContent(request.getContent());
        entity.setSeoTitle(request.getSeoTitle());
        entity.setSeoDescription(request.getSeoDescription());
        if (request.getActive() != null) {
            entity.setActive(request.getActive());
        }
        if (request.getSortOrder() != null) {
            entity.setSortOrder(request.getSortOrder());
        }
        if (request.getCoverImageId() != null) {
            MediaAsset media = mediaRepository.findById(request.getCoverImageId()).orElse(null);
            log.info("mapRequestToEntity: coverImageId={}, foundMedia={}", request.getCoverImageId(), media != null ? media.getId() : "NOT FOUND");
            entity.setCoverImage(media);
        } else {
            log.info("mapRequestToEntity: coverImageId is null, clearing coverImage");
            entity.setCoverImage(null);
        }
    }

    private String prepareSlug(String title, String requestedSlug, UUID idToIgnore) {
        String slug = (requestedSlug != null && !requestedSlug.trim().isEmpty()) 
                ? SlugUtils.generateSlug(requestedSlug) 
                : SlugUtils.generateSlug(title);

        if (RESERVED_SLUGS.contains(slug.toLowerCase())) {
            throw new IllegalArgumentException("Bu URL kısa adı sistem tarafından kullanılıyor. Lütfen farklı bir URL kısa adı seçin.");
        }

        boolean exists = (idToIgnore == null) 
                ? repository.existsBySlugAndDeletedAtIsNull(slug)
                : repository.existsBySlugAndDeletedAtIsNullAndIdNot(slug, idToIgnore);
        
        if (exists) {
            if (requestedSlug != null && !requestedSlug.trim().isEmpty()) {
                throw new DuplicateResourceException("Slug already exists: " + slug);
            } else {
                slug = slug + "-" + UUID.randomUUID().toString().substring(0, 8);
            }
        }
        return slug;
    }
}
