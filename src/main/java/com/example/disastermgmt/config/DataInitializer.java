package com.example.disastermgmt.config;

import com.example.disastermgmt.models.Disaster;
import com.example.disastermgmt.models.Role;
import com.example.disastermgmt.models.User;
import com.example.disastermgmt.repositories.DisasterRepository;
import com.example.disastermgmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private DisasterRepository disasterRepository;

        @Autowired
        private com.example.disastermgmt.repositories.ResourceRepository resourceRepository;

        @Autowired
        private PasswordEncoder encoder;

        @Override
        public void run(String... args) throws Exception {
                if (userRepository.count() == 0) {
                        userRepository.save(new User("Admin User", "admin@test.com", encoder.encode("admin123"),
                                        Role.ROLE_ADMIN,
                                        "1234567890", "Global"));
                        userRepository.save(
                                        new User("Responder One", "responder@test.com", encoder.encode("responder123"),
                                                        Role.ROLE_RESPONDER, "0987654321", "Kerala"));
                        userRepository.save(new User("Citizen One", "citizen@test.com", encoder.encode("citizen123"),
                                        Role.ROLE_CITIZEN, "1122334455", "Kerala"));
                }

                if (disasterRepository.count() == 0) {
                        disasterRepository.save(
                                        new Disaster("Flood", "Kerala, India", "High", LocalDateTime.now().minusDays(1),
                                                        "Active", "Heavy rainfall causing floods in low-lying areas."));
                        disasterRepository.save(
                                        new Disaster("Earthquake", "Tokyo, Japan", "Critical", LocalDateTime.now(),
                                                        "Active", "Magnitude 6.5 earthquake detected."));
                        disasterRepository.save(new Disaster("Wildfire", "California, USA", "Medium",
                                        LocalDateTime.now().minusHours(5), "Active",
                                        "Forest fire spreading near residential zones."));
                }

                if (resourceRepository.count() == 0) {
                        resourceRepository.save(new com.example.disastermgmt.models.Resource("Bottled Water", 5000,
                                        "Liters", "Warehouse A", "Supplies"));
                        resourceRepository.save(new com.example.disastermgmt.models.Resource("First Aid Kits", 200,
                                        "Boxes", "Base Camp B", "Medical"));
                        resourceRepository.save(new com.example.disastermgmt.models.Resource("Dry Food Rations", 1000,
                                        "Kg", "Central Store", "Food"));
                }
        }
}
