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
@Table("WORKEXPERIENCE")
public class WorkExperience {

    @Id
    private Long id;
    @Column("RESUMEID")
    private Long resumeId; //Foreign key to Resume
    @Column("DETAIL")
    private String detail; //Similar to Education, this could be structured data in a single column
}