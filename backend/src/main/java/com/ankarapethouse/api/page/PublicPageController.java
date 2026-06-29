package com.ankarapethouse.api.page;

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
