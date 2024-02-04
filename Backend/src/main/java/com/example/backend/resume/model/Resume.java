package com.example.backend.resume.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    private Long id; //resumeId
    private String name;
    private String email;
    private String phoneNumber;
    private String linkedinProfile;
    private String professionalSummary;
    private List<String> education;
    private List<String> workExperiences;
}
