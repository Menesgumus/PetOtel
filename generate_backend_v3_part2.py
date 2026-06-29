import os

base_dir = r"c:\Users\muham\Desktop\ankarapethouse\backend\src\main\java\com\ankarapethouse\api"

files = {
    # ------------------ MEDIA MODULE ------------------
    "media/MediaAsset.java": """package com.ankarapethouse.api.media;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "media_assets")
public class MediaAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "stored_filename", nullable = false)
    private String storedFilename;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "mime_type", nullable = false, length = 100)
    private String mimeType;

    @Column(name = "size_bytes", nullable = false)
    private Long sizeBytes;

    private Integer width;
    private Integer height;

    @Column(name = "alt_text")
    private String altText;

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
    "media/MediaRepository.java": """package com.ankarapethouse.api.media;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MediaRepository extends JpaRepository<MediaAsset, UUID> {}
""",
    "media/dto/MediaResponse.java": """package com.ankarapethouse.api.media.dto;

import com.ankarapethouse.api.media.MediaAsset;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MediaResponse {
    private UUID id;
    private String originalFilename;
    private String url;
    private String mimeType;
    private Long sizeBytes;
    private Integer width;
    private Integer height;
    private String altText;
    private LocalDateTime createdAt;

    public static MediaResponse from(MediaAsset entity) {
        if (entity == null) return null;
        MediaResponse dto = new MediaResponse();
        dto.setId(entity.getId());
        dto.setOriginalFilename(entity.getOriginalFilename());
        dto.setUrl(entity.getUrl());
        dto.setMimeType(entity.getMimeType());
        dto.setSizeBytes(entity.getSizeBytes());
        dto.setWidth(entity.getWidth());
        dto.setHeight(entity.getHeight());
        dto.setAltText(entity.getAltText());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
""",
    "media/MediaService.java": """package com.ankarapethouse.api.media;

import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final Path fileStorageLocation;
    
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/avif");

    public MediaService(MediaRepository mediaRepository, @Value("${app.upload-dir}") String uploadDir) {
        this.mediaRepository = mediaRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public MediaAsset uploadFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IllegalArgumentException("File name is missing");
        }
        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Sorry! Filename contains invalid path sequence");
        }
        
        String mimeType = file.getContentType();
        if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
            throw new IllegalArgumentException("Only JPEG, PNG, WEBP and AVIF files are allowed. SVG is blocked for security.");
        }

        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }
        
        String storedFilename = UUID.randomUUID().toString() + extension;
        
        try {
            Path targetLocation = this.fileStorageLocation.resolve(storedFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            MediaAsset asset = new MediaAsset();
            asset.setOriginalFilename(originalFilename);
            asset.setStoredFilename(storedFilename);
            asset.setUrl("/uploads/" + storedFilename);
            asset.setMimeType(mimeType);
            asset.setSizeBytes(file.getSize());

            try {
                BufferedImage image = ImageIO.read(file.getInputStream());
                if (image != null) {
                    asset.setWidth(image.getWidth());
                    asset.setHeight(image.getHeight());
                }
            } catch (Exception e) {
                // Ignore image dimension reading errors
            }

            return mediaRepository.save(asset);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFilename + ". Please try again!", ex);
        }
    }
    
    public Page<MediaAsset> getAllMedia(Pageable pageable) {
        return mediaRepository.findAll(pageable);
    }
    
    public MediaAsset getMediaById(UUID id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
    }
    
    public void updateAltText(UUID id, String altText) {
        MediaAsset asset = getMediaById(id);
        asset.setAltText(altText);
        mediaRepository.save(asset);
    }

    public void deleteMedia(UUID id) {
        MediaAsset asset = getMediaById(id);
        mediaRepository.delete(asset);
        // Note: For Phase 3, we are safely deleting metadata.
        // Physical file deletion can be added here or via an async cleanup job.
        try {
            Path targetLocation = this.fileStorageLocation.resolve(asset.getStoredFilename());
            Files.deleteIfExists(targetLocation);
        } catch (IOException ex) {
            // Log warning but don't fail the request if file is already missing
        }
    }
}
""",
    "media/AdminMediaController.java": """package com.ankarapethouse.api.media;

import com.ankarapethouse.api.media.dto.MediaResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/media")
public class AdminMediaController {

    private final MediaService mediaService;

    public AdminMediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/upload")
    public ResponseEntity<MediaResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        MediaAsset asset = mediaService.uploadFile(file);
        return ResponseEntity.ok(MediaResponse.from(asset));
    }

    @GetMapping
    public ResponseEntity<Page<MediaResponse>> getAllMedia(Pageable pageable) {
        return ResponseEntity.ok(mediaService.getAllMedia(pageable).map(MediaResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaResponse> getMedia(@PathVariable UUID id) {
        return ResponseEntity.ok(MediaResponse.from(mediaService.getMediaById(id)));
    }

    @PatchMapping("/{id}/alt-text")
    public ResponseEntity<Void> updateAltText(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        mediaService.updateAltText(id, body.get("altText"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable UUID id) {
        mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}
""",

    # ------------------ BLOG MODULE ------------------
    "blog/BlogPost.java": """package com.ankarapethouse.api.blog;

import com.ankarapethouse.api.media.MediaAsset;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "blog_posts")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(length = 500)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_image_id")
    private MediaAsset coverImage;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", length = 500)
    private String seoDescription;

    @Column(nullable = false)
    private String status = "DRAFT";

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

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
    "blog/BlogRepository.java": """package com.ankarapethouse.api.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface BlogRepository extends JpaRepository<BlogPost, UUID> {
    Page<BlogPost> findByDeletedAtIsNull(Pageable pageable);
    Page<BlogPost> findByStatusAndDeletedAtIsNull(String status, Pageable pageable);
    Optional<BlogPost> findByIdAndDeletedAtIsNull(UUID id);
    Optional<BlogPost> findBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
}
""",
    "blog/dto/BlogRequest.java": """package com.ankarapethouse.api.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class BlogRequest {
    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String slug;

    @Size(max = 500)
    private String summary;

    @NotBlank
    private String content;

    private UUID coverImageId;

    @Size(max = 255)
    private String seoTitle;

    @Size(max = 500)
    private String seoDescription;

    private String status;
}
""",
    "blog/dto/BlogResponse.java": """package com.ankarapethouse.api.blog.dto;

import com.ankarapethouse.api.blog.BlogPost;
import com.ankarapethouse.api.media.dto.MediaResponse;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BlogResponse {
    private UUID id;
    private String title;
    private String slug;
    private String summary;
    private String content;
    private MediaResponse coverImage;
    private String seoTitle;
    private String seoDescription;
    private String status;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BlogResponse from(BlogPost entity) {
        if (entity == null) return null;
        BlogResponse dto = new BlogResponse();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setSummary(entity.getSummary());
        dto.setContent(entity.getContent());
        dto.setCoverImage(MediaResponse.from(entity.getCoverImage()));
        dto.setSeoTitle(entity.getSeoTitle());
        dto.setSeoDescription(entity.getSeoDescription());
        dto.setStatus(entity.getStatus());
        dto.setPublishedAt(entity.getPublishedAt());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
""",
    "blog/BlogService.java": """package com.ankarapethouse.api.blog;

import com.ankarapethouse.api.blog.dto.BlogRequest;
import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.media.MediaAsset;
import com.ankarapethouse.api.media.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final MediaRepository mediaRepository;

    public BlogService(BlogRepository blogRepository, MediaRepository mediaRepository) {
        this.blogRepository = blogRepository;
        this.mediaRepository = mediaRepository;
    }

    public Page<BlogPost> getAdminPosts(String status, Pageable pageable) {
        if (status != null && !status.isEmpty()) {
            return blogRepository.findByStatusAndDeletedAtIsNull(status, pageable);
        }
        return blogRepository.findByDeletedAtIsNull(pageable);
    }

    public Page<BlogPost> getPublicPosts(Pageable pageable) {
        return blogRepository.findByStatusAndDeletedAtIsNull("PUBLISHED", pageable);
    }

    public BlogPost getPostById(UUID id) {
        return blogRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found"));
    }

    public BlogPost getPostBySlug(String slug) {
        return blogRepository.findBySlugAndDeletedAtIsNull(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found"));
    }

    public BlogPost createPost(BlogRequest request) {
        String slug = prepareSlug(request.getTitle(), request.getSlug(), null);

        BlogPost post = new BlogPost();
        mapRequestToEntity(request, post);
        post.setSlug(slug);

        if ("PUBLISHED".equals(post.getStatus())) {
            post.setPublishedAt(LocalDateTime.now());
        }

        return blogRepository.save(post);
    }

    public BlogPost updatePost(UUID id, BlogRequest request) {
        BlogPost post = getPostById(id);
        String slug = prepareSlug(request.getTitle(), request.getSlug(), id);

        String oldStatus = post.getStatus();
        mapRequestToEntity(request, post);
        post.setSlug(slug);

        if (!"PUBLISHED".equals(oldStatus) && "PUBLISHED".equals(post.getStatus()) && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }

        return blogRepository.save(post);
    }

    public void deletePost(UUID id) {
        BlogPost post = getPostById(id);
        post.setDeletedAt(LocalDateTime.now());
        blogRepository.save(post);
    }

    public void updateStatus(UUID id, String status) {
        BlogPost post = getPostById(id);
        String oldStatus = post.getStatus();
        post.setStatus(status);
        if (!"PUBLISHED".equals(oldStatus) && "PUBLISHED".equals(status) && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }
        blogRepository.save(post);
    }

    private void mapRequestToEntity(BlogRequest request, BlogPost post) {
        post.setTitle(request.getTitle());
        post.setSummary(request.getSummary());
        post.setContent(request.getContent());
        post.setSeoTitle(request.getSeoTitle());
        post.setSeoDescription(request.getSeoDescription());
        post.setStatus(request.getStatus() != null ? request.getStatus() : "DRAFT");

        if (request.getCoverImageId() != null) {
            MediaAsset media = mediaRepository.findById(request.getCoverImageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
            post.setCoverImage(media);
        } else {
            post.setCoverImage(null);
        }
    }

    private String prepareSlug(String title, String requestedSlug, UUID idToIgnore) {
        String slug = (requestedSlug != null && !requestedSlug.trim().isEmpty()) 
                ? SlugUtils.generateSlug(requestedSlug) 
                : SlugUtils.generateSlug(title);

        boolean exists = (idToIgnore == null) 
                ? blogRepository.existsBySlugAndDeletedAtIsNull(slug)
                : blogRepository.existsBySlugAndDeletedAtIsNullAndIdNot(slug, idToIgnore);
        
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
    "blog/AdminBlogController.java": """package com.ankarapethouse.api.blog;

import com.ankarapethouse.api.blog.dto.BlogRequest;
import com.ankarapethouse.api.blog.dto.BlogResponse;
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
@RequestMapping("/api/v1/admin/blog")
public class AdminBlogController {

    private final BlogService blogService;

    public AdminBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<Page<BlogResponse>> getPosts(
            @RequestParam(required = false) String status,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(blogService.getAdminPosts(status, pageable).map(BlogResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getPost(@PathVariable UUID id) {
        return ResponseEntity.ok(BlogResponse.from(blogService.getPostById(id)));
    }

    @PostMapping
    public ResponseEntity<BlogResponse> createPost(@Valid @RequestBody BlogRequest request) {
        return ResponseEntity.ok(BlogResponse.from(blogService.createPost(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> updatePost(@PathVariable UUID id, @Valid @RequestBody BlogRequest request) {
        return ResponseEntity.ok(BlogResponse.from(blogService.updatePost(id, request)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        blogService.updateStatus(id, body.get("status"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        blogService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
""",
    "blog/PublicBlogController.java": """package com.ankarapethouse.api.blog;

import com.ankarapethouse.api.blog.dto.BlogResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/blog")
public class PublicBlogController {

    private final BlogService blogService;

    public PublicBlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<Page<BlogResponse>> getPosts(
            @PageableDefault(sort = "publishedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(blogService.getPublicPosts(pageable).map(BlogResponse::from));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogResponse> getPostBySlug(@PathVariable String slug) {
        BlogPost post = blogService.getPostBySlug(slug);
        if (!"PUBLISHED".equals(post.getStatus())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BlogResponse.from(post));
    }
}
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Part 2 generated successfully.")
