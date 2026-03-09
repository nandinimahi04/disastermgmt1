package com.example.disastermgmt.controllers;

import com.example.disastermgmt.models.Disaster;
import com.example.disastermgmt.services.DisasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    @Autowired
    private DisasterService disasterService;

    @GetMapping
    public List<Disaster> getAllDisasters() {
        return disasterService.getAllDisasters();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Disaster> createDisaster(@RequestBody Disaster disaster) {
        return ResponseEntity.ok(disasterService.createDisaster(disaster));
    }
}
