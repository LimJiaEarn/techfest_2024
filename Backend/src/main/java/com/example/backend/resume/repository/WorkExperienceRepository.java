package com.example.backend.resume.repository;

import com.example.backend.resume.model.WorkExperience;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkExperienceRepository extends CrudRepository<WorkExperience, Long> {
    //Find all work experience records for a given resume
    List<WorkExperience> findByResumeId(Long resumeId);
}
