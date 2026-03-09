package com.example.disastermgmt.services;

import com.example.disastermgmt.models.IncidentReport;
import com.example.disastermgmt.repositories.IncidentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IncidentReportService {
    @Autowired
    private IncidentReportRepository repository;

    public IncidentReport createReport(IncidentReport report) {
        return repository.save(report);
    }

    public List<IncidentReport> getAllReports() {
        return repository.findAll();
    }

    public List<IncidentReport> getReportsByReporter(Long reporterId) {
        return repository.findByReporterId(reporterId);
    }

    public IncidentReport updateStatus(Long id, String status) {
        IncidentReport report = repository.findById(id).orElseThrow();
        report.setStatus(status);
        return repository.save(report);
    }
}
