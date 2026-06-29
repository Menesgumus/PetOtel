package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.servicecatalog.dto.PetServiceRequest;
import com.ankarapethouse.api.servicecatalog.dto.PetServiceResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/services")
public class AdminPetServiceController {
    
    private final PetServiceCatalog serviceCatalog;

    public AdminPetServiceController(PetServiceCatalog serviceCatalog) {
        this.serviceCatalog = serviceCatalog;
    }

    @GetMapping
    public ResponseEntity<Page<PetServiceResponse>> getServices(
            @PageableDefault(sort = "sortOrder", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(serviceCatalog.getAdminServices(pageable).map(PetServiceResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetServiceResponse> getService(@PathVariable UUID id) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.getServiceById(id)));
    }

    @PostMapping
    public ResponseEntity<PetServiceResponse> createService(@Valid @RequestBody PetServiceRequest request) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.createService(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetServiceResponse> updateService(@PathVariable UUID id, @Valid @RequestBody PetServiceRequest request) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.updateService(id, request)));
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> updateActive(@PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        serviceCatalog.updateActiveStatus(id, body.getOrDefault("isActive", true));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/sort-order")
    public ResponseEntity<Void> updateSortOrder(@PathVariable UUID id, @RequestBody Map<String, Integer> body) {
        serviceCatalog.updateSortOrder(id, body.getOrDefault("sortOrder", 0));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable UUID id) {
        serviceCatalog.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
