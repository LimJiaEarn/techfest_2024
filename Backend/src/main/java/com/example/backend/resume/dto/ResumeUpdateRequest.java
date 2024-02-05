package com.example.backend.resume.dto;

import com.example.backend.resume.model.Education;
import com.example.backend.resume.model.WorkExperience;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ResumeUpdateRequest {
    @NotNull(message = "Invalid Id: id is null")
    private Long id;
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
    @NotBlank(message = "Invalid Education: education is null")
    private List<Education> education;
    @NotBlank(message = "Invalid Work Experiences: work experience is null")
    private List<WorkExperience> workExperiences;
}

