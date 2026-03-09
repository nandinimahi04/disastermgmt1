package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "disaster_id")
    private Disaster disaster;

    @ManyToOne
    @JoinColumn(name = "responder_id")
    private User responder;

    @Column(length = 2000)
    private String details;

    private LocalDateTime submittedAt;

    public Report(Disaster disaster, User responder, String details, LocalDateTime submittedAt) {
        this.disaster = disaster;
        this.responder = responder;
        this.details = details;
        this.submittedAt = submittedAt;
    }
}
