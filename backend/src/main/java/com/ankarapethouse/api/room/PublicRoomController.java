package com.ankarapethouse.api.room;

import com.ankarapethouse.api.room.dto.RoomResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/public/rooms")
public class PublicRoomController {

    private final RoomService roomService;

    public PublicRoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getRooms() {
        List<RoomResponse> responses = roomService.getPublicRooms().stream()
                .map(RoomResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<RoomResponse> getRoomBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(RoomResponse.from(roomService.getRoomBySlug(slug)));
    }
}
