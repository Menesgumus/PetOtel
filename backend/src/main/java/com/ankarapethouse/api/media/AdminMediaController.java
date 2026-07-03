package com.ankarapethouse.api.media;

import com.ankarapethouse.api.media.dto.MediaResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.ankarapethouse.api.blog.BlogRepository;
import com.ankarapethouse.api.page.PageContentRepository;
import com.ankarapethouse.api.room.RoomRepository;
import com.ankarapethouse.api.servicecatalog.PetServiceRepository;

@RestController
@RequestMapping("/api/v1/admin/media")
public class AdminMediaController {

    private final MediaService mediaService;
    private final BlogRepository blogRepository;
    private final PageContentRepository pageContentRepository;
    private final RoomRepository roomRepository;
    private final PetServiceRepository petServiceRepository;

    public AdminMediaController(MediaService mediaService,
                                BlogRepository blogRepository,
                                PageContentRepository pageContentRepository,
                                RoomRepository roomRepository,
                                PetServiceRepository petServiceRepository) {
        this.mediaService = mediaService;
        this.blogRepository = blogRepository;
        this.pageContentRepository = pageContentRepository;
        this.roomRepository = roomRepository;
        this.petServiceRepository = petServiceRepository;
    }

    private MediaResponse enhanceWithUsages(MediaResponse response) {
        List<String> usages = new ArrayList<>();
        
        blogRepository.findByCoverImageId(response.getId()).forEach(b -> 
            usages.add("Blog: " + b.getTitle())
        );
        pageContentRepository.findByCoverImageId(response.getId()).forEach(p -> {
            if ("anasayfa".equals(p.getSlug())) {
                usages.add("Sayfa: Ana Sayfa - Hero");
            } else if ("hakkimizda".equals(p.getSlug())) {
                usages.add("Sayfa: Hakkımızda");
            }
        });
        
        pageContentRepository.findBySecondaryImageId(response.getId()).forEach(p -> {
            if ("anasayfa".equals(p.getSlug())) {
                usages.add("Sayfa: Ana Sayfa - Neden Bizi Tercih Etmelisiniz");
            }
        });
        roomRepository.findByCoverImageId(response.getId()).forEach(r -> 
            usages.add("Oda: " + r.getTitle())
        );
        petServiceRepository.findByCoverImageId(response.getId()).forEach(s -> 
            usages.add("Hizmet: " + s.getTitle())
        );
        
        response.setUsages(usages);
        return response;
    }

    @PostMapping("/upload")
    public ResponseEntity<MediaResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        MediaAsset asset = mediaService.uploadFile(file);
        return ResponseEntity.ok(enhanceWithUsages(MediaResponse.from(asset)));
    }

    @GetMapping
    public ResponseEntity<Page<MediaResponse>> getAllMedia(Pageable pageable) {
        return ResponseEntity.ok(mediaService.getAllMedia(pageable).map(MediaResponse::from).map(this::enhanceWithUsages));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaResponse> getMedia(@PathVariable UUID id) {
        return ResponseEntity.ok(enhanceWithUsages(MediaResponse.from(mediaService.getMediaById(id))));
    }

    @PatchMapping("/{id}/alt-text")
    public ResponseEntity<Void> updateAltText(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        mediaService.updateAltText(id, body.get("altText"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable UUID id) {
        mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}
