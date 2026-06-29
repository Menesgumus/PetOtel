package com.ankarapethouse.api.page;

import com.ankarapethouse.api.page.dto.PageContentRequest;
import com.ankarapethouse.api.page.dto.PageContentResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/pages")
public class AdminPageController {

    private final PageContentService service;

    public AdminPageController(PageContentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PageContentResponse>> getAllPages() {
        return ResponseEntity.ok(service.getAllPages().stream().map(PageContentResponse::from).collect(Collectors.toList()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PageContentResponse> getPageBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(PageContentResponse.from(service.getPageBySlug(slug)));
    }

    @PutMapping("/{slug}")
    public ResponseEntity<PageContentResponse> updatePage(@PathVariable String slug, @Valid @RequestBody PageContentRequest request) {
        return ResponseEntity.ok(PageContentResponse.from(service.updatePage(slug, request)));
    }
}
