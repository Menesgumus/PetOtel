package com.ankarapethouse.api.room.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@Getter @Setter
public class Room extends BaseEntity {
    private String title;
    private String slug;
    private String description;
    private boolean isActive = true;
    private int sortOrder = 0;
    private LocalDateTime deletedAt;
}
