import os

base_dir = r"c:\Users\muham\Desktop\ankarapethouse\backend\src\main\java\com\ankarapethouse\api"

files = {
    r"common\model\BaseEntity.java": """package com.ankarapethouse.api.common.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@Getter @Setter
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "created_at", updatable = false)
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
    r"blog\entity\BlogPost.java": """package com.ankarapethouse.api.blog.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
@Getter @Setter
public class BlogPost extends BaseEntity {
    private String title;
    private String slug;
    private String summary;
    private String content;
    private String status = "DRAFT";
    private LocalDateTime publishedAt;
    private LocalDateTime deletedAt;
}
""",
    r"blog\repository\BlogPostRepository.java": """package com.ankarapethouse.api.blog.repository;
import com.ankarapethouse.api.blog.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    Optional<BlogPost> findBySlugAndDeletedAtIsNullAndStatus(String slug, String status);
    List<BlogPost> findAllByDeletedAtIsNullAndStatus(String status);
}
""",
    r"blog\controller\BlogPublicController.java": """package com.ankarapethouse.api.blog.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/blog")
public class BlogPublicController {
    
    @GetMapping
    public List<Map<String, String>> getBlogPosts() {
        return List.of(Map.of("title", "Placeholder Blog", "slug", "placeholder-blog"));
    }
    
    @GetMapping("/{slug}")
    public Map<String, String> getBlogPost(@PathVariable String slug) {
        return Map.of("title", "Placeholder Blog Detail", "slug", slug);
    }
}
""",
    r"blog\controller\AdminBlogController.java": """package com.ankarapethouse.api.blog.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/blog")
public class AdminBlogController {
    @GetMapping
    public String getAdminBlogs() {
        return "Admin Blog Placeholder";
    }
}
""",
    r"servicecatalog\entity\PetService.java": """package com.ankarapethouse.api.servicecatalog.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "pet_services")
@Getter @Setter
public class PetService extends BaseEntity {
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private boolean isActive = true;
    private int sortOrder = 0;
    private LocalDateTime deletedAt;
}
""",
    r"servicecatalog\controller\PublicServiceController.java": """package com.ankarapethouse.api.servicecatalog.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/services")
public class PublicServiceController {
    @GetMapping
    public List<Map<String, String>> getServices() {
        return List.of(Map.of("title", "Placeholder Service", "slug", "placeholder"));
    }
}
""",
    r"servicecatalog\controller\AdminServiceController.java": """package com.ankarapethouse.api.servicecatalog.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/services")
public class AdminServiceController {
}
""",
    r"room\entity\Room.java": """package com.ankarapethouse.api.room.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@Getter @Setter
public class Room extends BaseEntity {
    private String title;
    private String slug;
    private String description;
    private boolean isActive = true;
    private int sortOrder = 0;
    private LocalDateTime deletedAt;
}
""",
    r"room\controller\PublicRoomController.java": """package com.ankarapethouse.api.room.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/rooms")
public class PublicRoomController {
    @GetMapping
    public List<Map<String, String>> getRooms() {
        return List.of(Map.of("title", "Placeholder Room", "slug", "placeholder"));
    }
}
""",
    r"room\controller\AdminRoomController.java": """package com.ankarapethouse.api.room.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/rooms")
public class AdminRoomController {
}
""",
    r"page\entity\PageContent.java": """package com.ankarapethouse.api.page.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "page_contents")
@Getter @Setter
public class PageContent extends BaseEntity {
    private String slug;
    private String title;
    private String content;
}
""",
    r"page\controller\PublicPageController.java": """package com.ankarapethouse.api.page.controller;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/pages")
public class PublicPageController {
    @GetMapping("/{slug}")
    public Map<String, String> getPage(@PathVariable String slug) {
        return Map.of("title", "Placeholder Page", "slug", slug);
    }
}
""",
    r"page\controller\AdminPageController.java": """package com.ankarapethouse.api.page.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/pages")
public class AdminPageController {
}
""",
    r"settings\entity\SiteSettings.java": """package com.ankarapethouse.api.settings.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "site_settings")
@Getter @Setter
public class SiteSettings extends BaseEntity {
    private String businessName;
    private String phone;
    private String email;
}
""",
    r"settings\controller\PublicSiteSettingsController.java": """package com.ankarapethouse.api.settings.controller;
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
""",
    r"settings\controller\AdminSiteSettingsController.java": """package com.ankarapethouse.api.settings.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/settings")
public class AdminSiteSettingsController {
}
""",
    r"media\entity\MediaAsset.java": """package com.ankarapethouse.api.media.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "media_assets")
@Getter @Setter
public class MediaAsset extends BaseEntity {
    private String originalFilename;
    private String storedFilename;
    private String url;
    private String mimeType;
    private Long sizeBytes;
}
""",
    r"media\controller\AdminMediaController.java": """package com.ankarapethouse.api.media.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/media")
public class AdminMediaController {
}
""",
    r"common\exception\GlobalExceptionHandler.java": """package com.ankarapethouse.api.common.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", "An unexpected error occurred", "message", ex.getMessage()));
    }
}
"""
}

for rel_path, content in files.items():
    abs_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Backend Java skeleton files generated successfully.")
