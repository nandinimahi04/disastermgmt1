package com.example.disastermgmt.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rescue_tasks")
@Data
@NoArgsConstructor
public class RescueTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "responder_id")
    private User responder;

    @ManyToOne
    @JoinColumn(name = "disaster_id")
    private Disaster disaster;

    private String taskStatus; // Pending, Ongoing, Completed

    @Column(length = 1000)
    private String description;

    private LocalDateTime updatedAt;

    public RescueTask(User responder, Disaster disaster, String taskStatus, String description,
            LocalDateTime updatedAt) {
        this.responder = responder;
        this.disaster = disaster;
        this.taskStatus = taskStatus;
        this.description = description;
        this.updatedAt = updatedAt;
    }
}
