package com.example.backend.resume.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "Invalid Education: education is null")
    private List<String> education;
    @NotBlank(message = "Invalid Work Experiences: work experience is null")
    private List<String> workExperiences;
    @NotBlank(message = "Invalid Skills: skills is null")
    private List<String> skills;
}

