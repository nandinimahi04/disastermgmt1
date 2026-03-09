package com.example.disastermgmt.repositories;

import com.example.disastermgmt.models.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DisasterRepository extends JpaRepository<Disaster, Long> {
    List<Disaster> findByStatus(String status);

    List<Disaster> findByType(String type);
}
