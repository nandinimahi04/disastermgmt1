package com.example.disastermgmt.services;

import com.example.disastermgmt.models.Alert;
import com.example.disastermgmt.repositories.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public List<Alert> getAlertsByRegion(String region) {
        return alertRepository.findByRegion(region);
    }

    public Alert broadcastAlert(Alert alert) {
        alert.setBroadcastTime(LocalDateTime.now());
        return alertRepository.save(alert);
    }
}
