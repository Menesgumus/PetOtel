package com.ankarapethouse.api.blog;

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
