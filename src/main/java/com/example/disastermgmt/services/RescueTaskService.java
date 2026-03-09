package com.example.disastermgmt.services;

import com.example.disastermgmt.models.RescueTask;
import com.example.disastermgmt.models.User;
import com.example.disastermgmt.repositories.RescueTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RescueTaskService {

    @Autowired
    private RescueTaskRepository rescueTaskRepository;

    public List<RescueTask> getAllTasks() {
        return rescueTaskRepository.findAll();
    }

    public List<RescueTask> getTasksByResponder(User responder) {
        return rescueTaskRepository.findByResponder(responder);
    }

    public RescueTask updateTaskStatus(Long taskId, String status) {
        RescueTask task = rescueTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTaskStatus(status);
        task.setUpdatedAt(LocalDateTime.now());
        return rescueTaskRepository.save(task);
    }

    public RescueTask assignTask(RescueTask task) {
        task.setUpdatedAt(LocalDateTime.now());
        if (task.getTaskStatus() == null) {
            task.setTaskStatus("Pending");
        }
        return rescueTaskRepository.save(task);
    }
}
