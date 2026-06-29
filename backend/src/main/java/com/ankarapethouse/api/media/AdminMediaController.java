package com.ankarapethouse.api.media;

import com.ankarapethouse.api.media.dto.MediaResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/media")
public class AdminMediaController {

    private final MediaService mediaService;

    public AdminMediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/upload")
    public ResponseEntity<MediaResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        MediaAsset asset = mediaService.uploadFile(file);
        return ResponseEntity.ok(MediaResponse.from(asset));
    }

    @GetMapping
    public ResponseEntity<Page<MediaResponse>> getAllMedia(Pageable pageable) {
        return ResponseEntity.ok(mediaService.getAllMedia(pageable).map(MediaResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaResponse> getMedia(@PathVariable UUID id) {
        return ResponseEntity.ok(MediaResponse.from(mediaService.getMediaById(id)));
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
