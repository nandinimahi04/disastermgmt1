package com.example.disastermgmt.controllers;

import com.example.disastermgmt.models.IncidentReport;
import com.example.disastermgmt.services.IncidentReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentReportController {
    @Autowired
    private IncidentReportService service;

    @PostMapping
    @PreAuthorize("hasRole('CITIZEN') or hasRole('ADMIN')")
    public ResponseEntity<IncidentReport> createReport(@RequestBody IncidentReport report) {
        return ResponseEntity.ok(service.createReport(report));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<IncidentReport> getAllReports() {
        return service.getAllReports();
    }

    @GetMapping("/my-reports/{userId}")
    @PreAuthorize("hasRole('CITIZEN')")
    public List<IncidentReport> getMyReports(@PathVariable Long userId) {
        return service.getReportsByReporter(userId);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<IncidentReport> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }
}
