package com.ankarapethouse.api.media;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MediaRepository extends JpaRepository<MediaAsset, UUID> {}
