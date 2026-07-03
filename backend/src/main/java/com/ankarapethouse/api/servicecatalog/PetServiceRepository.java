package com.ankarapethouse.api.servicecatalog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PetServiceRepository extends JpaRepository<PetServiceEntity, UUID> {
    Page<PetServiceEntity> findByDeletedAtIsNull(Pageable pageable);
    List<PetServiceEntity> findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    Optional<PetServiceEntity> findByIdAndDeletedAtIsNull(UUID id);
    Optional<PetServiceEntity> findBySlugAndActiveTrueAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
    List<PetServiceEntity> findByCoverImageId(UUID coverImageId);
}
