package com.ankarapethouse.api.page;

import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.page.dto.PageContentRequest;
import org.springframework.stereotype.Service;
import java.util.List;

import com.ankarapethouse.api.media.MediaRepository;
import com.ankarapethouse.api.media.MediaAsset;

@Service
public class PageContentService {

    private final PageContentRepository repository;
    private final MediaRepository mediaRepository;

    public PageContentService(PageContentRepository repository, MediaRepository mediaRepository) {
        this.repository = repository;
        this.mediaRepository = mediaRepository;
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
        
        if (request.getCoverImageId() != null) {
            MediaAsset media = mediaRepository.findById(request.getCoverImageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
            entity.setCoverImage(media);
        } else {
            entity.setCoverImage(null);
        }
        
        if (request.getSecondaryImageId() != null) {
            MediaAsset media = mediaRepository.findById(request.getSecondaryImageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
            entity.setSecondaryImage(media);
        } else {
            entity.setSecondaryImage(null);
        }
        
        return repository.save(entity);
    }
}
