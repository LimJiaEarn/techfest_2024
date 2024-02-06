package com.example.backend.common.exception;

public class InvalidPrincipalException extends Exception {
    public InvalidPrincipalException(String errorMessage) {
        super(errorMessage);
    }
}
