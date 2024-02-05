package com.example.backend.resume.mapper;

import com.example.backend.resume.dto.*;
import com.example.backend.resume.model.Education;
import com.example.backend.resume.model.Resume;
import com.example.backend.resume.model.WorkExperience;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResumeMapper {
    List<ResumeResponse> fromResumesToResumeResponseList(List<Resume> entity);

    ResumeResponse fromResumeToResumeResponse(Resume entity);

    @Mapping(target = "education", source = "education", qualifiedByName = "stringsToEducations")
    @Mapping(target = "workExperiences", source = "workExperiences", qualifiedByName = "stringsToWorkExperiences")
    Resume fromResumeCreateRequestToResume(ResumeCreateRequest request);

    ResumeCreateResponse fromResumeToResumeCreateResponse(Resume entity);

    Resume fromResumeUpdateRequestToResume(ResumeUpdateRequest request);

    ResumeUpdateResponse fromResumeToResumeUpdateResponse(Resume entity);

    //Helper methods to convert List<String> to List<Education> and List<WorkExperience>
    @Named("stringsToEducations")
    default List<Education> stringsToEducations(List<String> strings) {
        if (strings == null) {
            return new ArrayList<>();
        }
        return strings.stream().map(s -> {
            Education education = new Education();
            education.setDetail(s);
            return education;
        }).collect(Collectors.toList());
    }

    @Named("stringsToWorkExperiences")
    default List<WorkExperience> stringsToWorkExperiences(List<String> strings) {
        if (strings == null) {
            return new ArrayList<>();
        }
        return strings.stream().map(s -> {
            WorkExperience workExperience = new WorkExperience();
            workExperience.setDetail(s);
            return workExperience;
        }).collect(Collectors.toList());
    }
}
