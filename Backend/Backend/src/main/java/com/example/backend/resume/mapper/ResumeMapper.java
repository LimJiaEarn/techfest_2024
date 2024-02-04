package com.example.backend.resume.mapper;

import com.example.backend.resume.dto.*;
import com.example.backend.resume.model.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResumeMapper {
    List<ResumeResponse> fromResumesToResumeResponseList(List<Resume> entity);

    ResumeResponse fromResumeToResumeResponse(Resume entity);

    Resume fromResumeCreateRequestToResume(ResumeCreateRequest request);
    
    ResumeCreateResponse fromResumeToResumeCreateResponse(Resume entity);

    Resume fromResumeUpdateRequestToResume(ResumeUpdateRequest request);

    ResumeUpdateResponse fromResumeToResumeUpdateResponse(Resume entity);
}
