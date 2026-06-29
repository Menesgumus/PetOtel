package com.ankarapethouse.api.media.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "media_assets")
@Getter @Setter
public class MediaAsset extends BaseEntity {
    private String originalFilename;
    private String storedFilename;
    private String url;
    private String mimeType;
    private Long sizeBytes;
}
