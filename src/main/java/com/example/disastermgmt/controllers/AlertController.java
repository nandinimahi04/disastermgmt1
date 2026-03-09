package com.example.disastermgmt.controllers;

import com.example.disastermgmt.models.Alert;
import com.example.disastermgmt.services.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    @GetMapping("/region/{region}")
    public List<Alert> getAlertsByRegion(@PathVariable String region) {
        return alertService.getAlertsByRegion(region);
    }

    @PostMapping("/broadcast")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Alert> broadcastAlert(@RequestBody Alert alert) {
        return ResponseEntity.ok(alertService.broadcastAlert(alert));
    }
}
