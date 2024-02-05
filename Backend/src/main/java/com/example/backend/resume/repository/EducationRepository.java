package com.example.backend.resume.repository;

import com.example.backend.resume.model.Education;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends CrudRepository<Education, Long> {
    //Find all education records for a given resume
    List<Education> findByResumeId(Long resumeId);
}
