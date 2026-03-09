package com.example.disastermgmt.repositories;

import com.example.disastermgmt.models.Report;
import com.example.disastermgmt.models.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByDisaster(Disaster disaster);
}
