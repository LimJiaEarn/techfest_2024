package com.example.backend.resume.repository;

import com.example.backend.resume.model.Resume;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends ListCrudRepository<Resume, Long> {

}
