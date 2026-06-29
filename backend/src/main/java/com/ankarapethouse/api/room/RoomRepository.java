package com.ankarapethouse.api.room;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    Page<Room> findByDeletedAtIsNull(Pageable pageable);
    List<Room> findByActiveTrueAndDeletedAtIsNullOrderBySortOrderAscTitleAsc();
    Optional<Room> findByIdAndDeletedAtIsNull(UUID id);
    Optional<Room> findBySlugAndActiveTrueAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNull(String slug);
    boolean existsBySlugAndDeletedAtIsNullAndIdNot(String slug, UUID id);
}
