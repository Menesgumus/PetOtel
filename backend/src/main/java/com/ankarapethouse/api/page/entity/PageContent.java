package com.ankarapethouse.api.page.entity;
import com.ankarapethouse.api.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "page_contents")
@Getter @Setter
public class PageContent extends BaseEntity {
    private String slug;
    private String title;
    private String content;
}
