package com.example.backend.resume.service;

import com.example.backend.common.validation.CommonValidationAndGetService;
import com.example.backend.resume.dto.*;
import com.example.backend.resume.mapper.ResumeMapper;
import com.example.backend.resume.model.Resume;
import com.example.backend.resume.repository.ResumeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Slf4j
public class ResumeService {

    private final ResumeMapper resumeMapper;
    private final ResumeRepository resumeRepository;
    private final CommonValidationAndGetService commonValidationAndGetService;

    public ResumeService(ResumeMapper resumeMapper, ResumeRepository resumeRepository, CommonValidationAndGetService commonValidationAndGetService) {
        this.resumeMapper = resumeMapper;
        this.resumeRepository = resumeRepository;
        this.commonValidationAndGetService = commonValidationAndGetService;
    }

    public List<ResumeResponse> getResumes() {
        List<Resume> resumes = resumeRepository.findAll();
        return resumeMapper.fromResumesToResumeResponseList(resumes);
    }

    public ResumeResponse getResumeById(Long id) throws Exception {
        return resumeMapper.fromResumeToResumeResponse(commonValidationAndGetService.validateAndGetResume(id));
    }

    @Transactional
    public ResumeCreateResponse create(ResumeCreateRequest request) {
        Resume newResume = resumeMapper.fromResumeCreateRequestToResume(request);
        Resume savedResume = resumeRepository.save(newResume);
        ResumeCreateResponse response = resumeMapper.fromResumeToResumeCreateResponse(savedResume);
        response.setIsSuccess(true);
        return response;
    }

    @Transactional
    public ResumeUpdateResponse edit(ResumeUpdateRequest request, Long id) throws Exception {
        log.info("Editing resume with id: {}", id);
        commonValidationAndGetService.validateAndGetResume(id);
        Resume editedResume = resumeMapper.fromResumeUpdateRequestToResume(request);
        editedResume.setId(id);
        log.info("Edited resume: {}", editedResume.toString());
        Resume savedResume = resumeRepository.save(editedResume);
        log.info("Saved resume: {}", savedResume.toString());
        ResumeUpdateResponse response = resumeMapper.fromResumeToResumeUpdateResponse(savedResume);
        response.setIsSuccess(true);
        return response;
    }

    @Transactional
    public void delete(Long id) throws Exception {
        commonValidationAndGetService.validateAndGetResume(id);
        resumeRepository.deleteById(id);
    }
}
