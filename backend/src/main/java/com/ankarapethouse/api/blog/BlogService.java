package com.ankarapethouse.api.blog;

import com.ankarapethouse.api.blog.dto.BlogRequest;
import com.ankarapethouse.api.common.exception.DuplicateResourceException;
import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import com.ankarapethouse.api.common.utils.SlugUtils;
import com.ankarapethouse.api.media.MediaAsset;
import com.ankarapethouse.api.media.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
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

    @Transactional
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

    @Transactional
    public void deletePost(UUID id) {
        BlogPost post = getPostById(id);
        post.setDeletedAt(LocalDateTime.now());
        blogRepository.save(post);
    }

    @Transactional
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
