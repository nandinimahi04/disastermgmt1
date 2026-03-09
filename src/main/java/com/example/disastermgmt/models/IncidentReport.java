package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident_reports")
@Data
@NoArgsConstructor
public class IncidentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    private String type; // Fire, Flood, Medical, etc.
    private String location;
    private String description;
    private String severity; // Low, Medium, High, Critical
    private String status; // Pending, Verified, Resolved, Dismissed
    private LocalDateTime reportTime;

    public IncidentReport(User reporter, String type, String location, String description, String severity) {
        this.reporter = reporter;
        this.type = type;
        this.location = location;
        this.description = description;
        this.severity = severity;
        this.status = "Pending";
        this.reportTime = LocalDateTime.now();
    }
}
