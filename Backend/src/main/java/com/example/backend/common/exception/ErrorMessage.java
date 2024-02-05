package com.example.backend.common.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class ErrorMessage {
    private int statusCode;
    private LocalDateTime timestamp;
    private List<String> message;
    private String description;

    public ErrorMessage(int statusCode, LocalDateTime timestamp, List<String> message, String description) {
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.message = message;
        this.description = description;
    }
}
