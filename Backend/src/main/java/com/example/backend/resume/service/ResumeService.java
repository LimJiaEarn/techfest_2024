package com.example.backend.resume.service;

import com.example.backend.common.validation.CommonValidationAndGetService;
import com.example.backend.resume.dto.*;
import com.example.backend.resume.mapper.ResumeMapper;
import com.example.backend.resume.model.Education;
import com.example.backend.resume.model.Resume;
import com.example.backend.resume.model.WorkExperience;
import com.example.backend.resume.repository.EducationRepository;
import com.example.backend.resume.repository.ResumeRepository;
import com.example.backend.resume.repository.WorkExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeMapper resumeMapper;
    private final ResumeRepository resumeRepository;

    private final EducationRepository educationRepository;

    private final WorkExperienceRepository workExperienceRepository;

    private final CommonValidationAndGetService commonValidationAndGetService;

    public ResumeService(ResumeMapper resumeMapper, ResumeRepository resumeRepository, CommonValidationAndGetService commonValidationAndGetService, EducationRepository educationRepository, WorkExperienceRepository workExperienceRepository) {
        this.resumeMapper = resumeMapper;
        this.resumeRepository = resumeRepository;
        this.commonValidationAndGetService = commonValidationAndGetService;
        this.educationRepository = educationRepository;
        this.workExperienceRepository = workExperienceRepository;
    }

//    public List<ResumeResponse> getResumes() {
//        List<Resume> resumes = resumeRepository.findAll();
//        return resumeMapper.fromResumesToResumeResponseList(resumes);
//    }

    public List<ResumeResponse> getResumes() {
        List<Resume> resumes = resumeRepository.findAll();
        resumes.forEach(resume -> {
            List<Education> educations = educationRepository.findByResumeId(resume.getId());
            List<WorkExperience> workExperiences = workExperienceRepository.findByResumeId(resume.getId());
            resume.setEducation(educations);
            resume.setWorkExperiences(workExperiences);
        });
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
        commonValidationAndGetService.validateAndGetResume(id);
        Resume editedResume = resumeMapper.fromResumeUpdateRequestToResume(request);
        Resume savedResume = resumeRepository.save(editedResume);
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
