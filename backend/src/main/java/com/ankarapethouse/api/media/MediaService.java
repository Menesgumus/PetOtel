package com.ankarapethouse.api.media;

import com.ankarapethouse.api.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final Path fileStorageLocation;
    
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/avif");

    public MediaService(MediaRepository mediaRepository, @Value("${app.upload-dir}") String uploadDir) {
        this.mediaRepository = mediaRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public MediaAsset uploadFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IllegalArgumentException("File name is missing");
        }
        if (originalFilename.contains("..")) {
            throw new IllegalArgumentException("Sorry! Filename contains invalid path sequence");
        }
        
        String mimeType = file.getContentType();
        if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
            throw new IllegalArgumentException("Only JPEG, PNG, WEBP and AVIF files are allowed. SVG is blocked for security.");
        }

        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }
        
        String storedFilename = UUID.randomUUID().toString() + extension;
        
        try {
            Path targetLocation = this.fileStorageLocation.resolve(storedFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            MediaAsset asset = new MediaAsset();
            asset.setOriginalFilename(originalFilename);
            asset.setStoredFilename(storedFilename);
            asset.setUrl("/uploads/" + storedFilename);
            asset.setMimeType(mimeType);
            asset.setSizeBytes(file.getSize());

            try {
                BufferedImage image = ImageIO.read(file.getInputStream());
                if (image != null) {
                    asset.setWidth(image.getWidth());
                    asset.setHeight(image.getHeight());
                }
            } catch (Exception e) {
                // Ignore image dimension reading errors
            }

            return mediaRepository.save(asset);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFilename + ". Please try again!", ex);
        }
    }
    
    public Page<MediaAsset> getAllMedia(Pageable pageable) {
        return mediaRepository.findAll(pageable);
    }
    
    public MediaAsset getMediaById(UUID id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Media not found"));
    }
    
    public void updateAltText(UUID id, String altText) {
        MediaAsset asset = getMediaById(id);
        asset.setAltText(altText);
        mediaRepository.save(asset);
    }

    public void deleteMedia(UUID id) {
        MediaAsset asset = getMediaById(id);
        mediaRepository.delete(asset);
        // Note: For Phase 3, we are safely deleting metadata.
        // Physical file deletion can be added here or via an async cleanup job.
        try {
            Path targetLocation = this.fileStorageLocation.resolve(asset.getStoredFilename());
            Files.deleteIfExists(targetLocation);
        } catch (IOException ex) {
            // Log warning but don't fail the request if file is already missing
        }
    }
}
