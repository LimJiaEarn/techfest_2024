package com.example.backend.resume.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.resume.dto.*;
import com.example.backend.resume.service.ResumeService;
import com.example.backend.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/resumes")
public class ResumeController extends BaseController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping()
    public ResponseEntity<List<ResumeResponse>> fetchResumes() {
        List<ResumeResponse> list = resumeService.getResumes();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResume(@PathVariable("id") Long id, @AuthenticationPrincipal UserPrincipal principal) throws Exception {
        log.info("Obtaining userId from security context: {}", getLoginUserId(principal));
        ResumeResponse resumeResponse = resumeService.getResumeById(id);
        return ResponseEntity.ok(resumeResponse);
    }

    @PostMapping()
    public ResponseEntity<ResumeCreateResponse> create(@RequestBody ResumeCreateRequest request) {
        ResumeCreateResponse response = resumeService.create(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeUpdateResponse> edit(@RequestBody ResumeUpdateRequest request, @PathVariable("id") Long id) throws Exception {
        ResumeUpdateResponse response = resumeService.edit(request, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) throws Exception {
        resumeService.delete(id);
        return ResponseEntity.ok(true);
    }

    //Uploading resume
    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserPrincipal principal) {
        if (file.isEmpty() || !isPdfFile(file)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file. Please upload a PDF.");
        }
        try {
            log.info("Uploading resume for userId: {}", getLoginUserId(principal));
            ResumeResponse resumeResponse = resumeService.uploadResume(file, getLoginUserId(principal));
            return ResponseEntity.ok(resumeResponse);
        } catch (Exception e) {
            log.error("Error uploading file: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading file.");
        }
    }

    private boolean isPdfFile(MultipartFile file) {
        return "application/pdf".equals(file.getContentType());
    }


}
