package com.example.disastermgmt.services;

import com.example.disastermgmt.models.Disaster;
import com.example.disastermgmt.repositories.DisasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DisasterService {

    @Autowired
    private DisasterRepository disasterRepository;

    public List<Disaster> getAllDisasters() {
        return disasterRepository.findAll();
    }

    public Disaster createDisaster(Disaster disaster) {
        if (disaster.getTimestamp() == null) {
            disaster.setTimestamp(LocalDateTime.now());
        }
        return disasterRepository.save(disaster);
    }

    // Every 5 minutes, simulate fetching new data if needed
    // In a real app, this would call an external API
    @Scheduled(fixedRate = 300000)
    public void fetchExternalDisasterData() {
        System.out.println("Fetching external disaster data...");
        // Logic to parse external API data would go here
    }

    public void mockInitialData() {
        if (disasterRepository.count() == 0) {
            disasterRepository.save(new Disaster("Flood", "Kerala, India", "High", LocalDateTime.now(), "Active",
                    "Heavy rainfall causing floods in low-lying areas."));
            disasterRepository.save(new Disaster("Earthquake", "Tokyo, Japan", "Critical", LocalDateTime.now(),
                    "Active", "Magnitude 6.5 earthquake detected."));
            disasterRepository.save(new Disaster("Wildfire", "California, USA", "Medium", LocalDateTime.now(), "Active",
                    "Forest fire spreading near residential zones."));
        }
    }
}
