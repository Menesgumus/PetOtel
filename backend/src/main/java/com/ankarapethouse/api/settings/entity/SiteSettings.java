package com.ankarapethouse.api.settings.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "site_settings")
@Getter @Setter
public class SiteSettings extends BaseEntity {
    private String businessName;
    private String phone;
    private String email;
}
