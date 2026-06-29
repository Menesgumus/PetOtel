package com.ankarapethouse.api.room;

import com.ankarapethouse.api.room.dto.RoomRequest;
import com.ankarapethouse.api.room.dto.RoomResponse;
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
@RequestMapping("/api/v1/admin/rooms")
public class AdminRoomController {
    
    private final RoomService roomService;

    public AdminRoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<Page<RoomResponse>> getRooms(
            @PageableDefault(sort = "sortOrder", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(roomService.getAdminRooms(pageable).map(RoomResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable UUID id) {
        return ResponseEntity.ok(RoomResponse.from(roomService.getRoomById(id)));
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(RoomResponse.from(roomService.createRoom(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable UUID id, @Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(RoomResponse.from(roomService.updateRoom(id, request)));
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Void> updateActive(@PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        roomService.updateActiveStatus(id, body.getOrDefault("isActive", true));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/sort-order")
    public ResponseEntity<Void> updateSortOrder(@PathVariable UUID id, @RequestBody Map<String, Integer> body) {
        roomService.updateSortOrder(id, body.getOrDefault("sortOrder", 0));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
