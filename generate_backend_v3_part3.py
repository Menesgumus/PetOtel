import os

base_dir = r"c:\Users\muham\Desktop\ankarapethouse\backend\src\main\java\com\ankarapethouse\api"

files = {
    # ------------------ SERVICE CATALOG MODULE ------------------
    "servicecatalog/PetServiceEntity.java": """package com.ankarapethouse.api.servicecatalog;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "pet_services")
public class PetServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", length = 500)
    private String seoDescription;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

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
    "servicecatalog/PetServiceRepository.java": """package com.ankarapethouse.api.servicecatalog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PetServiceRepository extends JpaRepository<PetServiceEntity, UUID> {
    Page<PetServiceEntity> findByDeletedAtIsNull(Pageable pageable);
    List<PetServiceEntity> findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    Optional<PetServiceEntity> findByIdAndDeletedAtIsNull(UUID id);
    Optional<PetServiceEntity> findBySlugAndActiveTrueAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
}
""",
    "servicecatalog/dto/PetServiceRequest.java": """package com.ankarapethouse.api.servicecatalog.dto;

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
""",
    "servicecatalog/dto/PetServiceResponse.java": """package com.ankarapethouse.api.servicecatalog.dto;

import com.ankarapethouse.api.servicecatalog.PetServiceEntity;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PetServiceResponse {
    private UUID id;
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private String seoTitle;
    private String seoDescription;
    private boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PetServiceResponse from(PetServiceEntity entity) {
        if (entity == null) return null;
        PetServiceResponse dto = new PetServiceResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setShortDescription(entity.getShortDescription());
        dto.setContent(entity.getContent());
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setActive(entity.isActive());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
""",
    "servicecatalog/PetServiceCatalog.java": """package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.servicecatalog.dto.PetServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PetServiceCatalog {
    private final PetServiceRepository repository;

    public PetServiceCatalog(PetServiceRepository repository) {
        this.repository = repository;
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

    public PetServiceEntity createService(PetServiceRequest request) {
        String slug = prepareSlug(request.getTitle(), request.getSlug(), null);
        
        PetServiceEntity entity = new PetServiceEntity();
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    public PetServiceEntity updateService(UUID id, PetServiceRequest request) {
        PetServiceEntity entity = getServiceById(id);
        String slug = prepareSlug(request.getTitle(), request.getSlug(), id);
        
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    public void updateActiveStatus(UUID id, boolean isActive) {
        PetServiceEntity entity = getServiceById(id);
        entity.setActive(isActive);
        repository.save(entity);
    }

    public void updateSortOrder(UUID id, Integer sortOrder) {
        PetServiceEntity entity = getServiceById(id);
        entity.setSortOrder(sortOrder != null ? sortOrder : 0);
        repository.save(entity);
    }

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
""",
    "servicecatalog/AdminPetServiceController.java": """package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.servicecatalog.dto.PetServiceRequest;
import com.ankarapethouse.api.servicecatalog.dto.PetServiceResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/services")
public class AdminPetServiceController {
    
    private final PetServiceCatalog serviceCatalog;

    public AdminPetServiceController(PetServiceCatalog serviceCatalog) {
        this.serviceCatalog = serviceCatalog;
    }

    @GetMapping
    public ResponseEntity<Page<PetServiceResponse>> getServices(
            @PageableDefault(sort = "sortOrder", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(serviceCatalog.getAdminServices(pageable).map(PetServiceResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetServiceResponse> getService(@PathVariable UUID id) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.getServiceById(id)));
    }

    @PostMapping
    public ResponseEntity<PetServiceResponse> createService(@Valid @RequestBody PetServiceRequest request) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.createService(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetServiceResponse> updateService(@PathVariable UUID id, @Valid @RequestBody PetServiceRequest request) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.updateService(id, request)));
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> updateActive(@PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        serviceCatalog.updateActiveStatus(id, body.getOrDefault("isActive", true));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/sort-order")
    public ResponseEntity<Void> updateSortOrder(@PathVariable UUID id, @RequestBody Map<String, Integer> body) {
        serviceCatalog.updateSortOrder(id, body.getOrDefault("sortOrder", 0));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable UUID id) {
        serviceCatalog.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
""",
    "servicecatalog/PublicPetServiceController.java": """package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.servicecatalog.dto.PetServiceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/public/services")
public class PublicPetServiceController {

    private final PetServiceCatalog serviceCatalog;

    public PublicPetServiceController(PetServiceCatalog serviceCatalog) {
        this.serviceCatalog = serviceCatalog;
    }

    @GetMapping
    public ResponseEntity<List<PetServiceResponse>> getServices() {
        List<PetServiceResponse> responses = serviceCatalog.getPublicServices().stream()
                .map(PetServiceResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PetServiceResponse> getServiceBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.getServiceBySlug(slug)));
    }
}
""",

    # ------------------ ROOM MODULE ------------------
    "room/Room.java": """package com.ankarapethouse.api.room;

import com.ankarapethouse.api.media.MediaAsset;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_image_id")
    private MediaAsset coverImage;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", length = 500)
    private String seoDescription;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

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
    "room/RoomRepository.java": """package com.ankarapethouse.api.room;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    Page<Room> findByDeletedAtIsNull(Pageable pageable);
    List<Room> findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    Optional<Room> findByIdAndDeletedAtIsNull(UUID id);
    Optional<Room> findBySlugAndActiveTrueAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
}
""",
    "room/dto/RoomRequest.java": """package com.ankarapethouse.api.room.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class RoomRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String slug;

    private String description;

    private UUID coverImageId;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;

    private Boolean active;
    private Integer sortOrder;
}
""",
    "room/dto/RoomResponse.java": """package com.ankarapethouse.api.room.dto;

import com.ankarapethouse.api.media.dto.MediaResponse;
import com.ankarapethouse.api.room.Room;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RoomResponse {
    private UUID id;
    private String title;
    private String slug;
    private String description;
    private MediaResponse coverImage;
    private String seoTitle;
    private String seoDescription;
    private boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RoomResponse from(Room entity) {
        if (entity == null) return null;
        RoomResponse dto = new RoomResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        dto.setCoverImage(MediaResponse.from(entity.getCoverImage()));
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setActive(entity.isActive());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
""",
    "room/RoomService.java": """package com.ankarapethouse.api.room;

import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.media.MediaAsset;
import com.ankarapethouse.api.media.MediaRepository;
import com.ankarapethouse.api.room.dto.RoomRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    public Room createRoom(RoomRequest request) {
        String slug = prepareSlug(request.getTitle(), request.getSlug(), null);
        
        Room entity = new Room();
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    public Room updateRoom(UUID id, RoomRequest request) {
        Room entity = getRoomById(id);
        String slug = prepareSlug(request.getTitle(), request.getSlug(), id);
        
        mapRequestToEntity(request, entity);
        entity.setSlug(slug);
        
        return repository.save(entity);
    }

    public void updateActiveStatus(UUID id, boolean isActive) {
        Room entity = getRoomById(id);
        entity.setActive(isActive);
        repository.save(entity);
    }

    public void updateSortOrder(UUID id, Integer sortOrder) {
        Room entity = getRoomById(id);
        entity.setSortOrder(sortOrder != null ? sortOrder : 0);
        repository.save(entity);
    }

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
""",
    "room/AdminRoomController.java": """package com.ankarapethouse.api.room;

import com.ankarapethouse.api.room.dto.RoomRequest;
import com.ankarapethouse.api.room.dto.RoomResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/rooms")
public class AdminRoomController {
    
    private final RoomService roomService;

    public AdminRoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<Page<RoomResponse>> getRooms(
            @PageableDefault(sort = "sortOrder", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(roomService.getAdminRooms(pageable).map(RoomResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable UUID id) {
        return ResponseEntity.ok(RoomResponse.from(roomService.getRoomById(id)));
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(RoomResponse.from(roomService.createRoom(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable UUID id, @Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(RoomResponse.from(roomService.updateRoom(id, request)));
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> updateActive(@PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        roomService.updateActiveStatus(id, body.getOrDefault("isActive", true));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/sort-order")
    public ResponseEntity<Void> updateSortOrder(@PathVariable UUID id, @RequestBody Map<String, Integer> body) {
        roomService.updateSortOrder(id, body.getOrDefault("sortOrder", 0));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
""",
    "room/PublicRoomController.java": """package com.ankarapethouse.api.room;

import com.ankarapethouse.api.room.dto.RoomResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/public/rooms")
public class PublicRoomController {

    private final RoomService roomService;

    public PublicRoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getRooms() {
        List<RoomResponse> responses = roomService.getPublicRooms().stream()
                .map(RoomResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<RoomResponse> getRoomBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(RoomResponse.from(roomService.getRoomBySlug(slug)));
    }
}
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Part 3 generated successfully.")
