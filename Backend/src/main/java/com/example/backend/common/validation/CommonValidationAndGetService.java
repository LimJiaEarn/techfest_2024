package com.example.backend.common.validation;

import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.resume.model.Resume;
import com.example.backend.resume.repository.ResumeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class CommonValidationAndGetService {

    private final ResumeRepository resumeRepository;

    public Resume validateAndGetResume(Long resumeId) throws ResourceNotFoundException {
        return resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id " + resumeId));
    }

}
