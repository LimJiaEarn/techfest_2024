package com.example.backend.resume.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table("RESUME")
public class Resume {

    @Id
    private Long id; //resumeId
    @Column("NAME")
    private String name;
    @Column("EMAIL")
    private String email;
    @Column("PHONENUMBER")
    private String phoneNumber;
    @Column("LINKEDINPROFILE")
    private String linkedinProfile;
    @Column("PROFESSIONALSUMMARY")
    private String professionalSummary;
    @MappedCollection(idColumn = "RESUMEID", keyColumn = "ID")
    private List<Education> education;
    @MappedCollection(idColumn = "RESUMEID", keyColumn = "ID")
    private List<WorkExperience> workExperiences;
}
