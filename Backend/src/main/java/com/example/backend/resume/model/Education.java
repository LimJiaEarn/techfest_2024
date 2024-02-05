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
@Table("EDUCATION")
public class Education {

    @Id
    private Long id;
    @Column("RESUMEID")
    private Long resumeId; //Foreign key to Resume
    @Column("DETAIL")
    private String detail; //This could be a JSON string or a delimited string for multiple fields
}

