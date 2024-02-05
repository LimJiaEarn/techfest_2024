package com.example.backend.resume.controller;

import com.example.backend.common.controller.BaseController;
import com.example.backend.resume.dto.*;
import com.example.backend.resume.service.ResumeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ResumeResponse> getResume(@PathVariable("id") Long id) throws Exception {
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

}
