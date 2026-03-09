package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "disasters")
@Data
@NoArgsConstructor
public class Disaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // e.g., Flood, Earthquake, Fire

    private String location;

    private String severity; // Low, Medium, High, Critical

    private LocalDateTime timestamp;

    private String status; // Active, Resolved

    @Column(length = 2000)
    private String description;

    public Disaster(String type, String location, String severity, LocalDateTime timestamp, String status,
            String description) {
        this.type = type;
        this.location = location;
        this.severity = severity;
        this.timestamp = timestamp;
        this.status = status;
        this.description = description;
    }
}
