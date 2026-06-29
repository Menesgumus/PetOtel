package com.ankarapethouse.api.page.controller;
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
