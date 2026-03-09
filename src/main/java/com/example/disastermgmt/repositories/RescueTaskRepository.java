package com.example.disastermgmt.repositories;

import com.example.disastermgmt.models.RescueTask;
import com.example.disastermgmt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RescueTaskRepository extends JpaRepository<RescueTask, Long> {
    List<RescueTask> findByResponder(User responder);

    List<RescueTask> findByTaskStatus(String status);
}
