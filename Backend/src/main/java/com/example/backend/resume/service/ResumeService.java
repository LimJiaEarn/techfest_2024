package com.example.backend.resume.service;

import com.example.backend.common.validation.CommonValidationAndGetService;
import com.example.backend.resume.dto.*;
import com.example.backend.resume.mapper.ResumeMapper;
import com.example.backend.resume.model.Resume;
import com.example.backend.resume.repository.ResumeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public ResumeResponse uploadResume(MultipartFile file, Long userId) throws Exception {
        // Implement logic to save the file. This could involve saving the file to the file system,
        // cloud storage, or a database, and then creating or updating a Resume record in the database.
//        String filePath = saveFile(file, userId);

//        // After saving the file, create or update a Resume record associated with this file
//        // For simplicity, assuming a new resume record is created:
//        Resume resume = new Resume();
//        // Set properties on the resume object, including file path or identifier as needed
//        resume.setFilePath(filePath);
//        // Set other properties, possibly including setting the user ID, etc.
//
//        // Save the resume record to the database
//        Resume savedResume = resumeRepository.save(resume);

        Resume resume = new Resume();
        resume.setId(1L);
        resume.setName("The Tester");
        resume.setEmail("test@hotmail.com");
        resume.setPhoneNumber("91234567");
        resume.setLinkedinProfile("https://www.linkedin.com/in/wilsonbrianna");
        resume.setEducation("school A,school B");
        resume.setWorkExperiences("company A,company B");
        resume.setSkills("Python,Java,SQL,React");

        // Convert the saved resume record to a ResumeResponse
        return resumeMapper.fromResumeToResumeResponse(resume);
    }

//    private String saveFile(MultipartFile file, Long userId) throws IOException {
//        // Define the directory where the file will be saved
//        String directoryPath = "/path/to/directory";
//
//        // Create a file path or name that includes the user ID to avoid filename conflicts
//        String fileName = userId + "_" + System.currentTimeMillis() + ".pdf";
//        String fullPath = directoryPath + File.separator + fileName;
//
//        // Save the file to the filesystem
//        File savedFile = new File(fullPath);
//        file.transferTo(savedFile);
//
//        // Return the path or identifier for the saved file
//        return fullPath;
//    }
}
