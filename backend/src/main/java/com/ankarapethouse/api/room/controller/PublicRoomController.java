package com.ankarapethouse.api.room.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/rooms")
public class PublicRoomController {
    @GetMapping
    public List<Map<String, String>> getRooms() {
        return List.of(Map.of("title", "Placeholder Room", "slug", "placeholder"));
    }
}
