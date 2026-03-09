package com.example.disastermgmt.repositories;

import com.example.disastermgmt.models.IncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentReportRepository extends JpaRepository<IncidentReport, Long> {
    List<IncidentReport> findByReporterId(Long reporterId);

    List<IncidentReport> findByStatus(String status);
}
