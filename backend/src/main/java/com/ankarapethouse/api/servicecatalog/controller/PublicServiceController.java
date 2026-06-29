package com.ankarapethouse.api.servicecatalog.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/services")
public class PublicServiceController {
    @GetMapping
    public List<Map<String, String>> getServices() {
        return List.of(Map.of("title", "Placeholder Service", "slug", "placeholder"));
    }
}
