package com.example.disastermgmt.controllers;

import com.example.disastermgmt.models.RescueTask;
import com.example.disastermgmt.services.RescueTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class RescueTaskController {

    @Autowired
    private RescueTaskService rescueTaskService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('RESPONDER')")
    public List<RescueTask> getAllTasks() {
        return rescueTaskService.getAllTasks();
    }

    @PostMapping("/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RescueTask> assignTask(@RequestBody RescueTask task) {
        return ResponseEntity.ok(rescueTaskService.assignTask(task));
    }

    @PatchMapping("/{taskId}/status")
    @PreAuthorize("hasRole('RESPONDER') or hasRole('ADMIN')")
    public ResponseEntity<RescueTask> updateStatus(@PathVariable Long taskId, @RequestParam String status) {
        return ResponseEntity.ok(rescueTaskService.updateTaskStatus(taskId, status));
    }
}
