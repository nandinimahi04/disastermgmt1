package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@NoArgsConstructor
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "disaster_id")
    private Disaster disaster;

    @Column(length = 1000)
    private String message;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User creator;

    private LocalDateTime broadcastTime;

    private String region;

    public Alert(Disaster disaster, String message, User creator, LocalDateTime broadcastTime, String region) {
        this.disaster = disaster;
        this.message = message;
        this.creator = creator;
        this.broadcastTime = broadcastTime;
        this.region = region;
    }
}
