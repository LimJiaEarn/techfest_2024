package com.example.backend.resume.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

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
    @Column("EDUCATION")
    private String education; //JSON string of education list
    @Column("WORKEXPERIENCES")
    private String workExperiences; //JSON string of workExperiences list
    @Column("SKILLS")
    private String skills; //JSON string of skills list
}
