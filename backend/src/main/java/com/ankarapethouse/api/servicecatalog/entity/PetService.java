package com.ankarapethouse.api.servicecatalog.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "pet_services")
@Getter @Setter
public class PetService extends BaseEntity {
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private boolean isActive = true;
    private int sortOrder = 0;
    private LocalDateTime deletedAt;
}
