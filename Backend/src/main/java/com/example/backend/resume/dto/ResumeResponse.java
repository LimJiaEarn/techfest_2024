package com.example.backend.resume.dto;

import com.example.backend.resume.model.Education;
import com.example.backend.resume.model.WorkExperience;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ResumeResponse {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String linkedinProfile;
    private String professionalSummary;
    private List<Education> education;
    private List<WorkExperience> workExperiences;
}
