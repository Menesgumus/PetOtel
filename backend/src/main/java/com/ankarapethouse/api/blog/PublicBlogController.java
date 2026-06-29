package com.ankarapethouse.api.blog;

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
