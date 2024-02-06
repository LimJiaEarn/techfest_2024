package com.example.backend.resume.mapper;

import com.example.backend.resume.dto.*;
import com.example.backend.resume.model.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.util.Arrays;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResumeMapper {
    @Mapping(target = "education", source = "education", qualifiedByName = "stringToList")
    @Mapping(target = "workExperiences", source = "workExperiences", qualifiedByName = "stringToList")
    @Mapping(target = "skills", source = "skills", qualifiedByName = "stringToList")
    List<ResumeResponse> fromResumesToResumeResponseList(List<Resume> entity);

    @Mapping(target = "education", source = "education", qualifiedByName = "stringToList")
    @Mapping(target = "workExperiences", source = "workExperiences", qualifiedByName = "stringToList")
    @Mapping(target = "skills", source = "skills", qualifiedByName = "stringToList")
    ResumeResponse fromResumeToResumeResponse(Resume entity);

    @Mapping(target = "education", source = "education", qualifiedByName = "listToString")
    @Mapping(target = "workExperiences", source = "workExperiences", qualifiedByName = "listToString")
    @Mapping(target = "skills", source = "skills", qualifiedByName = "listToString")
    Resume fromResumeCreateRequestToResume(ResumeCreateRequest request);

    ResumeCreateResponse fromResumeToResumeCreateResponse(Resume entity);

    @Mapping(target = "education", source = "education", qualifiedByName = "listToString")
    @Mapping(target = "workExperiences", source = "workExperiences", qualifiedByName = "listToString")
    @Mapping(target = "skills", source = "skills", qualifiedByName = "listToString")
    Resume fromResumeUpdateRequestToResume(ResumeUpdateRequest request);

    ResumeUpdateResponse fromResumeToResumeUpdateResponse(Resume entity);

    @Named("listToString")
    default String listToString(List<String> list) {
        if (list == null) {
            return null;
        }
        return String.join(",", list); //Convert the list to a comma-separated string or use your preferred delimiter
    }

    @Named("stringToList")
    default List<String> stringToList(String value) {
        if (value == null) {
            return null;
        }
        return Arrays.asList(value.split(",")); //Convert the comma-separated string to a list of strings
    }

}
