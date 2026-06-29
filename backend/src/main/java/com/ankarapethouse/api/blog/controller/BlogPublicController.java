package com.ankarapethouse.api.blog.controller;
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
