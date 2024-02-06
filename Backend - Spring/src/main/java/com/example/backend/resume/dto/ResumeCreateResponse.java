package com.example.backend.resume.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResumeCreateResponse {

    private Boolean isSuccess;
    private Long id;
    private String name;

    public ResumeCreateResponse() {
        isSuccess = false;
    }
}
