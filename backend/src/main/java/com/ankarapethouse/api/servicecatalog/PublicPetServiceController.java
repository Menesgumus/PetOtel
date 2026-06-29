package com.ankarapethouse.api.servicecatalog;

import com.ankarapethouse.api.servicecatalog.dto.PetServiceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/public/services")
public class PublicPetServiceController {

    private final PetServiceCatalog serviceCatalog;

    public PublicPetServiceController(PetServiceCatalog serviceCatalog) {
        this.serviceCatalog = serviceCatalog;
    }

    @GetMapping
    public ResponseEntity<List<PetServiceResponse>> getServices() {
        List<PetServiceResponse> responses = serviceCatalog.getPublicServices().stream()
                .map(PetServiceResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PetServiceResponse> getServiceBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(PetServiceResponse.from(serviceCatalog.getServiceBySlug(slug)));
    }
}
