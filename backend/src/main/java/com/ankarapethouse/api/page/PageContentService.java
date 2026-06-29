package com.ankarapethouse.api.page;

import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.page.dto.PageContentRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageContentService {

    private final PageContentRepository repository;

    public PageContentService(PageContentRepository repository) {
        this.repository = repository;
    }

    public List<PageContent> getAllPages() {
        return repository.findAll();
    }

    public PageContent getPageBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Page not found: " + slug));
    }

    public PageContent updatePage(String slug, PageContentRequest request) {
        PageContent entity = repository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Page not found: " + slug));
        
        entity.setTitle(request.getTitle());
        entity.setContent(request.getContent());
        entity.setSeoTitle(request.getSeoTitle());
        entity.setSeoDescription(request.getSeoDescription());
        
        return repository.save(entity);
    }
}
