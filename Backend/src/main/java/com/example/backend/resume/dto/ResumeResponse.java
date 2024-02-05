package com.example.backend.resume.dto;

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
    private List<String> education;
    private List<String> workExperiences;
    private List<String> skills;
}
