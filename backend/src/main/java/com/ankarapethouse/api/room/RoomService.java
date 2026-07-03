package com.ankarapethouse.api.room;

import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.media.MediaAsset;
import com.ankarapethouse.api.media.MediaRepository;
import com.ankarapethouse.api.room.dto.RoomRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private final RoomRepository repository;
    private final MediaRepository mediaRepository;

    public RoomService(RoomRepository repository, MediaRepository mediaRepository) {
        this.repository = repository;
        this.mediaRepository = mediaRepository;
    }

    public Page<Room> getAdminRooms(Pageable pageable) {
        return repository.findByDeletedAtIsNull(pageable);
    }

    public List<Room> getPublicRooms() {
        return repository.findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    }

    public Room getRoomById(UUID id) {
        return repository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    public Room getRoomBySlug(String slug) {
        return repository.findBySlugAndActiveTrueAndDeletedAtIsNull(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    @Transactional
    public Room createRoom(RoomRequest request) {
        String slug = prepareSlug(request.getTitle(), request.getSlug(), null);
        
        Room entity = new Room();
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    @Transactional
    public Room updateRoom(UUID id, RoomRequest request) {
        Room entity = getRoomById(id);
        String slug = prepareSlug(request.getTitle(), request.getSlug(), id);
        
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    @Transactional
    public void updateActiveStatus(UUID id, boolean isActive) {
        Room entity = getRoomById(id);
        entity.setActive(isActive);
        repository.save(entity);
    }

    @Transactional
    public void updateSortOrder(UUID id, Integer sortOrder) {
        Room entity = getRoomById(id);
        entity.setSortOrder(sortOrder != null ? sortOrder : 0);
        repository.save(entity);
    }

    @Transactional
    public void deleteRoom(UUID id) {
        Room entity = getRoomById(id);
        entity.setDeletedAt(LocalDateTime.now());
        repository.save(entity);
    }

    private void mapRequestToEntity(RoomRequest request, Room entity) {
        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setSeoTitle(request.getSeoTitle());
        entity.setSeoDescription(request.getSeoDescription());
        if (request.getActive() != null) {
            entity.setActive(request.getActive());
        }
        if (request.getSortOrder() != null) {
            entity.setSortOrder(request.getSortOrder());
        }

        if (request.getCoverImageId() != null) {
            MediaAsset media = mediaRepository.findById(request.getCoverImageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
            entity.setCoverImage(media);
        } else {
            entity.setCoverImage(null);
        }
    }

    private String prepareSlug(String title, String requestedSlug, UUID idToIgnore) {
        String slug = (requestedSlug != null && !requestedSlug.trim().isEmpty()) 
                ? SlugUtils.generateSlug(requestedSlug) 
                : SlugUtils.generateSlug(title);

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
