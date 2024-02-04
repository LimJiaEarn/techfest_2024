package com.example.backend.common.exception;

public class ResourceNotFoundException extends Exception {
    public ResourceNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}