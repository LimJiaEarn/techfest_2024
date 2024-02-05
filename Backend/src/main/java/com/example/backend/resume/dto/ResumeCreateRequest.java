package com.example.backend.resume.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ResumeCreateRequest {
    @NotBlank(message = "Invalid Name: name is null")
    private String name;
    @NotBlank(message = "Invalid Email: email is null")
    @Email(message = "Invalid Email: email format is incorrect")
    private String email;
    @NotBlank(message = "Invalid Phone Number: phone number is null")
    private String phoneNumber;
    @NotBlank(message = "Invalid LinkedIn Profile: LinkedIn profile is null")
    private String linkedinProfile;
    @NotBlank(message = "Invalid Professional Summary: professional summary is null")
    @Size(max = 2000, message = "Invalid Professional Summary: professional summary exceeds maximum length of 2000 characters")
    private String professionalSummary;
    @NotEmpty(message = "Invalid Education: education is null")
    private List<String> education;
    @NotEmpty(message = "Invalid Work Experiences: work experience is null")
    private List<String> workExperiences;
    @NotEmpty(message = "Invalid Skills: skills is null")
    private List<String> skills;
}
